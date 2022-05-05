import { useEffect, useState } from 'react';
import { Input, InputNumber, Collapse, Select, Row, Col } from 'antd';
import { useSetState } from 'ahooks';

const { Panel } = Collapse;
const { Option } = Select;

const temp = {
  普通活动: [
    {
      id: 1,
      page: 'customerInfo',
      title: '客户信息',
    },
    {
      id: 2,
      page: 'pay',
      title: '网点归属',
    },
    {
      id: 3,
      page: 'bizInfo',
      title: '业务金额',
    },
    {
      id: 4,
      page: 'pay',
      title: '扫码领券',
    },
  ],
  影子活动: [
    {
      id: 1,
      page: 'customerInfo',
      title: '客户信息',
    },
    {
      id: 2,
      page: 'pay',
      title: '扫码领券',
    },
  ],
} as Record<string, any>;

type VModelType = {
  type?: string;
  value?: string;
  onChange?: (value: string | any[]) => void;
};

export const MyJsonEditor: React.FC<VModelType> = ({
  type,
  value,
  onChange,
}: VModelType) => {
  const [valueJson, setValueJson] = useState<any>();
  const [formJson, setFormJson] = useState<any>();

  const [state, setState] = useSetState({
    step1: undefined,
    step2: undefined,
    step3: undefined,
    step4: undefined,
  });

  useEffect(() => {
    if (type) {
      setFormJson(temp[type]);
    }
    // if (value) {
    //   setValueJson(JSON.parse(value));
    // } else if (type) {
    //   setValueJson(temp[type]);
    // }
  }, [type, value]);

  const onInputChange = (id: any, name: string, val: any) => {
    console.log('id,name,value', id, name, val);
  };

  return (
    <>
      <Collapse
        defaultActiveKey={[1, 2, 3, 4]}
        collapsible="disabled"
        bordered={false}
      >
        {formJson?.map((item: any) => {
          switch (item.page) {
            case 'customerInfo':
              return (
                <Panel header={item.title} key={item.id}>
                  <p>-</p>
                </Panel>
              );
            case 'pay':
              return (
                <Panel header={item.title} key={item.id}>
                  <Input.Group>
                    <Row gutter={8}>
                      <Col span={6}>
                        <InputNumber
                          addonBefore="￥"
                          placeholder="支付金额"
                          onChange={(v: any) =>
                            onInputChange(item.id, 'price', v)
                          }
                        />
                      </Col>
                      <Col span={6}>
                        <Select
                          mode="multiple"
                          allowClear
                          style={{ width: '300px' }}
                          placeholder="银行类型"
                          onChange={(v: any) =>
                            onInputChange(item.id, 'bank_type', v)
                          }
                        >
                          <Option value="CCB_CREDIT">建行信用卡</Option>
                          <Option value="CCB_MASTER">建行储蓄卡</Option>
                        </Select>
                      </Col>
                    </Row>
                  </Input.Group>
                </Panel>
              );
            case 'bizInfo':
              return (
                <Panel header={item.title} key={item.id}>
                  <Input.Group>
                    <Row gutter={8}>
                      <Col span={6}>
                        <InputNumber
                          addonBefore="￥"
                          placeholder="开始金额"
                          addonAfter="万元"
                          onChange={(v: any) =>
                            onInputChange(item.id, 'start', v)
                          }
                        />
                      </Col>
                      <Col span={6}>
                        <InputNumber
                          addonBefore="￥"
                          placeholder="结束金额"
                          addonAfter="万元"
                          onChange={(v: any) =>
                            onInputChange(item.id, 'end', v)
                          }
                        />
                      </Col>
                    </Row>
                  </Input.Group>
                </Panel>
              );
            default:
              break;
          }
        })}
      </Collapse>
    </>
  );
};
