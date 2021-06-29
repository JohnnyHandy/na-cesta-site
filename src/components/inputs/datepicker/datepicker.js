import React from 'react'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = (props) => {
  const {value, ...rest} = props
  return (
    <DatePicker selected={value} {...rest} />
  )
}

export default DatePickerComponent