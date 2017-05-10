import React from 'react';
import RCDatePicker from 'rmc-date-picker/lib/DatePicker';
import MultiPickerProps from './MultiDatePickerProps';
import moment from 'moment';
const minDate = moment('2000-1-1 00:00');
const maxDate = moment('2030-12-31 23:59');
const now = moment();
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import { getComponentLocale, getLocaleCode } from '../_util/getLocale';

class MultiPicker extends React.Component<MultiPickerProps, any> {
  static defaultProps = {
    onValueChange() {},
    disabled: false,
    startTime: now,
    endTime: now,
    mode: 'datetime',
  };

  constructor(props) {
    super(props);
    this.state = {
      minStartDate: this.props.minStartDate || minDate,
      maxStartDate: this.props.maxStartDate || maxDate,
      minEndDate: this.props.minEndDate || minDate,
      maxEndDate: this.props.maxEndDate || maxDate,
      startTime: this.props.startTime || now,
      endTime: this.props.endTime || now,
    };
  }

  getValue = () => {
    const { startTime, endTime } = this.state;
    return [startTime, endTime];
  }
  onValueChange = (i, v) => {
    if (this.props.onValueChange) {
      this.props.onValueChange(v, i);
    }
  }

  onDateStartTimeChange = (time) => {
    this.setState({
      startTime: time,
    }, () => {
      this.onValueChange(0, time);
    });
  }

  onDateEndTimeChange = (time) => {
    this.setState({
      endTime: time,
    }, () => {
      this.onValueChange(1, time);
    });
  }

  render() {
    const { props, context } = this;
    const {
      prefixCls, pickerPrefixCls,
      rootNativeProps,
      mode, value, defaultDate,
      startLabelText, endLabelText,
    } = props;

    const locale = getComponentLocale(props, context, 'DatePicker', () => require('./locale/zh_CN'));
    const localeCode = getLocaleCode(context);
    const { startText, endText } = locale;

    if (localeCode) {
      if (value) {
        value.locale(localeCode);
      }
      if (defaultDate) {
        defaultDate.locale(localeCode);
      }
    }

    const { startTime, endTime, minStartDate, maxStartDate, minEndDate, maxEndDate } = this.state;
    return (
      <div {...rootNativeProps}>
        <div className={`${prefixCls}-popup-label-title`}>{startLabelText || startText}</div>
        <RCDatePicker
          rootNativeProps={{ 'data-xx': 'yy' }}
          date={startTime}
          mode={mode}
          locale={locale}
          maxDate={maxStartDate}
          minDate={minStartDate}
          pickerPrefixCls={pickerPrefixCls}
          prefixCls={prefixCls}
          onDateChange={this.onDateStartTimeChange}
        />
        <div className={`${prefixCls}-popup-label-title`}>{endLabelText || endText}</div>
        <RCDatePicker
          rootNativeProps={{ 'data-xx': 'yy' }}
          date={endTime}
          mode={mode}
          locale={locale}
          maxDate={maxEndDate}
          minDate={minEndDate}
          pickerPrefixCls={pickerPrefixCls}
          prefixCls={prefixCls}
          onDateChange={this.onDateEndTimeChange}
        />
      </div>
    );
  }
};

export default MultiPicker;