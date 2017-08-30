import React from 'react';
import { render, mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Menu from '../index.web';

describe('Menu', () => {
  const data = [
    {
      label: 'Item1',
      value: '1',
    },
    {
      label: 'Item2',
      value: '2',
      children: [
        {
          label: 'Item21',
          value: '21',
        },
        {
          label: 'Item22',
          value: '22',
        },
      ],
    },
  ];

  it('renders correctly', () => {
    const wrapper = render(<Menu data={data} />);
    expect(renderToJson(wrapper)).toMatchSnapshot();
  });

  it('controll by value', () => {
    const wrapper = mount(<Menu data={data} value={['2', '22']} />);
    expect(wrapper.find('.am-list-item').at(1).hasClass('am-menu-selected')).toBe(true);
    expect(wrapper.find('.am-list-item').at(3).hasClass('am-sub-menu-item-selected')).toBe(true);
  });

  it('fires change event when item is selected', () => {
    jest.useFakeTimers();
    const handleChange = jest.fn();
    const wrapper = mount(<Menu data={data} onChange={handleChange} />);
    wrapper.find('.am-list-item').at(1).simulate('click');
    wrapper.find('.am-list-item').at(3).find('.am-radio-input').simulate('change');
    jest.runAllTimers();
    expect(handleChange).toBeCalledWith(['2', '22']);
  });

  describe('level 1', () => {
    it('renders correctly', () => {
      const wrapper = render(<Menu data={data} level="1" />);
      expect(renderToJson(wrapper)).toMatchSnapshot();
    });

    it('controll by value', () => {
      const wrapper = mount(<Menu data={data} level="1" value={['2']} />);
      expect(wrapper.find('.am-list-item').at(1).hasClass('am-sub-menu-item-selected')).toBe(true);
    });

    it('fires change event when item is selected', () => {
      jest.useFakeTimers();
      const handleChange = jest.fn();
      const wrapper = mount(<Menu data={data} level="1" onChange={handleChange} />);
      wrapper.find('.am-list-item').at(1).find('.am-radio-input').simulate('change');
      jest.runAllTimers();
      expect(handleChange).toBeCalledWith(['2']);
    });
  });

  describe('mult select menu', () => {
    it('renders correctly', () => {
      const wrapper = render(<Menu data={data} multSelect />);
      expect(renderToJson(wrapper)).toMatchSnapshot();
    });

    it('controll by value', () => {
      const wrapper = mount(<Menu data={data} multSelect value={['2', '21', '22']} />);
      expect(wrapper.find('.am-list-item').at(1).hasClass('am-menu-selected')).toBe(true);
      expect(wrapper.find('.am-list-item').at(2).hasClass('am-sub-menu-item-selected')).toBe(true);
      expect(wrapper.find('.am-list-item').at(3).hasClass('am-sub-menu-item-selected')).toBe(true);
    });

    it('fires change event when item is selected', () => {
      jest.useFakeTimers();
      const handleChange = jest.fn();
      const wrapper = mount(<Menu data={data} multSelect onChange={handleChange} />);
      wrapper.find('.am-list-item').at(1).simulate('click');
      wrapper.find('.am-list-item').at(2).find('.am-checkbox-input').simulate('change');
      wrapper.find('.am-list-item').at(3).find('.am-checkbox-input').simulate('change');
      jest.runAllTimers();
      expect(handleChange).toHaveBeenLastCalledWith(['2', '21', '22']);
    });
  });

  describe('mult select menu level 1', () => {
    it('renders correctly', () => {
      const wrapper = render(<Menu data={data} multSelect level="1" />);
      expect(renderToJson(wrapper)).toMatchSnapshot();
    });

    it('controll by value', () => {
      const wrapper = mount(<Menu data={data} multSelect level="1" value={['1', '2']} />);
      expect(wrapper.find('.am-list-item').at(0).hasClass('am-sub-menu-item-selected')).toBe(true);
      expect(wrapper.find('.am-list-item').at(1).hasClass('am-sub-menu-item-selected')).toBe(true);
    });

    it('fires change event when item is selected', () => {
      jest.useFakeTimers();
      const handleChange = jest.fn();
      const wrapper = mount(<Menu data={data} multSelect level="1" onChange={handleChange} />);
      wrapper.find('.am-list-item').at(0).find('.am-checkbox-input').simulate('change');
      wrapper.find('.am-list-item').at(1).find('.am-checkbox-input').simulate('change');
      jest.runAllTimers();
      expect(handleChange).toHaveBeenLastCalledWith(['1', '2']);
    });

    it('fires onOk event when ok btn is clicked', () => {
      jest.useFakeTimers();
      const onOk = jest.fn();
      const wrapper = mount(<Menu data={data} multSelect value={['1', '2']} level="1" onOk={onOk} />);
      wrapper.find('.am-mult-select-btns-btn').at(1).simulate('click');
      jest.runAllTimers();
      expect(onOk).toBeCalledWith(['1', '2']);
    });

    it('fires onCancel event when cancel btn is clicked', () => {
      jest.useFakeTimers();
      const onCancel = jest.fn();
      const wrapper = mount(<Menu data={data} multSelect value={['1', '2']} level="1" onCancel={onCancel} />);
      wrapper.find('.am-mult-select-btns-btn').at(0).simulate('click');
      jest.runAllTimers();
      expect(onCancel).toHaveBeenCalled();
    });
  });
});
