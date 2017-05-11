import React from 'react'
import { arrayOf, array as arrayAny, oneOfType, string, object, bool, func, element } from 'prop-types'
import { Block, Row } from '../layout'
import { Switch } from '../input'
import Icons from '../icons'
import { Info } from '../display'
import { keyMatch } from 'modules/store'
import { array } from 'feathers-schema/lib/helper'

const Item = ({children, onFocus, onBlur, onClick, active, ...rest }) =>
  <Block component='li' shaded classes={['dropdown-item', { 'dropdown-item-active': active }]} {...rest} >
    <Block onFocus={onFocus} onBlur={onBlur} onClick={onClick} tabIndex={0} component='a'>{children}</Block>
  </Block>

class Dropdown extends React.Component {

  state = {
    open: false,
  }

  createItems() {

    const { options, value, empty, multiple } = this.props

    const items = options.map(option => {

      const isObj = is(option, Object)
      const key = isObj ? option.key : option
      const title = isObj ? option.title || option.key : option

      const active = multiple
        ? value && value.some(v => keyMatch(v, key))
        : keyMatch(value, key)

      return <Item onFocus={this.open} onBlur={this.close} onClick={() => this.select(key)}
        key={String(key)} active={active} >
        {title}
      </Item>
    })

    if (empty)
      items.unshift(
        <Item onFocus={this.open} onBlur={this.close} onClick={() => this.select(null)}
          key={null} active={multiple ? !value || value.length === 0 : !value} >
          {
            is(empty, String, Object) ? empty : '-'
          }
        </Item>
      )

    return items
  }

  valueAsString() {

    const { options, value, children, multiple } = this.props

    if (children)
      return children

    if (!value)
      return ''

    const titles = options
      .filter(option => {
        const key = is(option, Object)
          ? option.key
          : option

        return multiple
          ? value.some( v => keyMatch(v, key))
          : keyMatch(value, key)
      })
      .map(option =>
        is(option, Object) ? option.title || String(option.key) : option
      )

    return titles.length === 0
      ? ''
      : multiple && titles.length > 1
        ? `(${titles.length})`
        : titles[0]

  }

  select = key => {

    const { onChange, multiple } = this.props
    const { value: oldValue } = this.props

    const newValue = multiple && is(oldValue, Array) //oldValue might not be an array if the multiple prop has changed
      ? oldValue.some( old => keyMatch(key, old))
        ? oldValue.filter( old => !keyMatch(key, old))
        : [key, ...oldValue]
      : multiple
        ? [key]
        : key

    onChange(newValue)

    if (!multiple && !keyMatch(oldValue, newValue))
      this.close()

  }

  open = () => this.setState({ open: true })

  close = () => this.setState({ open: false })


  render() {

    const { classes, brand, info, children, placeholder, value, multiple, ...rest } = this.props

    const { open } = this.state

    delete rest.options
    delete rest.multiple
    delete rest.onChange
    delete rest.empty

    // const showValue = is(value, Array) ? value.length > 0 : value != null && value != ''
    const hasValue = multiple ? value && value.length > 0 : !!value
    const showCounter = !!multiple && hasValue

    return <Block classes={['dropdown', classes]} brand={brand} {...rest}>

      <Block component='a' tabIndex={0} placeholder={placeholder} value={value}
        onFocus={this.open} onBlur={this.close} >

        <Row brand={brand} >
          <Block show={!!placeholder && !hasValue && !children} inline classes='dropdown-placeholder'>{placeholder}</Block>
          <Block show={hasValue || !!children } >{ this.valueAsString() }</Block>
          <Icons.Caret hide={showCounter} classes={['dropdown-caret', {'dropdown-caret-up': open }]} height='0.5em'/>
          <Switch show={showCounter} active classes='dropdown-multi-counter' icon={value && value.length} />
        </Row>

      </Block>

      <Block brand={brand} classes='dropdown-items' shaded time show={open}
        component='ul'>{ this.createItems() }</Block>

      <Info>{info}</Info>

    </Block>
  }

}

Dropdown.propTypes = {
  options: arrayOf(oneOfType([string, object])),
  multiple: bool,
  onChange: func.isRequired,
  value: oneOfType([string, arrayAny]),

  empty: oneOfType([bool, element, string])
}

Dropdown.defaultProps = {
  value: []
}

export default Dropdown

export { Item }
