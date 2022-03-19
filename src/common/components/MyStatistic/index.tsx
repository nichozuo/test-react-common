/* eslint-disable react/no-array-index-key */
import { Col, Row, Statistic } from 'antd';
import type { StatisticProps } from 'antd';

export type MyStatisticProps = {
  /**
   * 需要展示的数据
   */
  items?: StatisticProps[];
  /**
   * 间距
   * @default 16
   */
  gutter?: number;
};

export const MyStatistic = (props: MyStatisticProps) => {
  return (
    props.items && (
      <>
        <Row gutter={props.gutter ?? 16}>
          {props.items?.map((item, index) => {
            return (
              <Col span={6} key={index}>
                <Statistic {...item} />
              </Col>
            );
          })}
        </Row>
      </>
    )
  );
};
