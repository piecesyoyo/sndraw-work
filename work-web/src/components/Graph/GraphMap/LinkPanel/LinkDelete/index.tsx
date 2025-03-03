import { deleteGraphLink } from '@/services/common/ai/graph';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, Popconfirm } from 'antd';
import React, { useState } from 'react';

interface LinkDeleteProps {
  graph: string;
  workspace: string;
  link: any;
  refresh?: () => void;
  disabled: boolean;
}

const LinkDelete: React.FC<LinkDeleteProps> = (props) => {
  const { graph, workspace, link, refresh, disabled } = props;
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    // const linkId = link.id?.split("_")?.map((v: any) => v.replace(/^"|"$/g, ''))?.join("_");
    // console.log(linkId)
    await deleteGraphLink({
      graph: graph,
      workspace: workspace,
      link_id: link.id,
    })
      .then((response) => {
        refresh?.();
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <>
      {/* 确认删除弹窗 */}
      <Popconfirm
        title="确定要删除该节点关系吗？"
        disabled={loading || disabled}
        onConfirm={() => {
          handleDelete();
        }}
      >
        <Button
          icon={<DeleteOutlined />}
          title="删除"
          type="text"
          disabled={loading || disabled}
          danger
        ></Button>
      </Popconfirm>
    </>
  );
};

export default LinkDelete;
