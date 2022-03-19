import { Form, Input, Popover, Button, Row, Col } from 'antd';
import { useEffect, useState } from 'react';
import { BgColorsOutlined } from '@ant-design/icons';
import './index.less';
import {
  red,
  volcano,
  gold,
  yellow,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  magenta,
  grey,
} from '@ant-design/colors';
import { FormItemProps } from '@ant-design/pro-form';

const Content = ({ onChange }: any) => {
  return (
    <div className="my-color-picker-content">
      {[
        red,
        volcano,
        gold,
        yellow,
        lime,
        green,
        cyan,
        blue,
        geekblue,
        purple,
        magenta,
        grey,
      ].map((c, index) => (
        <Row key={index}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((v) => {
            return (
              <Col
                key={index + '_' + v}
                style={{ backgroundColor: c[v] }}
                onClick={() => onChange(c[v])}
              ></Col>
            );
          })}
        </Row>
      ))}
    </div>
  );
};

type ColorPickerType = {
  value?: string;
  onChange?: (value: string) => void;
};

const ColorPicker = ({ value, onChange }: ColorPickerType) => {
  const [color, setColor] = useState(value);

  useEffect(() => {
    setColor(value);
  }, [value]);

  return (
    <Input.Group compact>
      <Input style={{ width: '200px' }} value={color} />
      <Popover
        placement="right"
        title={false}
        content={
          <Content
            onChange={(c: string) => {
              setColor(c);
              onChange?.(c);
            }}
          />
        }
        trigger="click"
        // className="my-color-picker"
      >
        <Button style={{ backgroundColor: color }}>
          <BgColorsOutlined />
        </Button>
      </Popover>
    </Input.Group>
  );
};

export const MyColorPicker = ({ name, label, ...rest }: FormItemProps) => {
  return (
    <Form.Item name={name} label={label} {...rest}>
      <ColorPicker />
    </Form.Item>
  );
};
