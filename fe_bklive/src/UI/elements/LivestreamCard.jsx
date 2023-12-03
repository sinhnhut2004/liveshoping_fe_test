import { Badge, Card, Row } from 'antd';
import Title from 'antd/es/skeleton/Title';
import React from 'react';
import { PlayIcon } from '@heroicons/react/outline';

export default function LivestreamCard({ time, img }) {
  return (
    <Card hoverable className="p-0 mb-xl" bodyStyle={{ padding: 0 }}>
      <Row className="pb-lg p-lg" justify={'space-between'}>
        <Badge count="Live" className="" />
        <span>{time}</span>
      </Row>
      <div className="relative">
        <img alt="example" src={img} loading="lazy" className="w-full" />
        <PlayIcon
          //   style={{ color: 'gray', width: '40px', height: '40px' }}
          className="absolute inset-1/2 -translate-x-1/2 -translate-y-1/2 text-white w-[40px] h-[40px] hover:scale-110 duration-200"
        />
      </div>
    </Card>
  );
}
