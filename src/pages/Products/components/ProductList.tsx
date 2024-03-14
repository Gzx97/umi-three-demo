import React from "react";
import { Button, Popconfirm, Table } from "antd";

const ProductList: React.FC<{
  products: { name: string; id: string }[];
  onDelete: (id: string) => void;
}> = ({ onDelete, products }) => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Actions",
      render(text: any, record: { id: string }) {
        return (
          <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
            <Button>Delete</Button>
          </Popconfirm>
        );
      },
    },
  ];
  return <Table rowKey="id" dataSource={products} columns={columns} />;
};

export default ProductList;
