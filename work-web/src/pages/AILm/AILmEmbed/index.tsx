import ChatPanel from '@/components/ChatPanel';
import Page404 from '@/pages/404';
import { AILmEmbed, getAILmInfo } from '@/services/common/ai/lm';
import { Access, useAccess, useParams, useRequest } from '@umijs/max';
import { Divider, Space, Tag } from 'antd';
import { useEffect } from 'react';
import styles from './index.less';

const AILmEmbedPage: React.FC = () => {
  const access = useAccess();
  const { platform, model } = useParams();
  // const [isStream, setIsStream] = useState<boolean>(true);
  // const [supportImages, setSupportImages] = useState<boolean>(true);

  // 模型信息-请求
  const { data, loading, run } = useRequest(
    () =>
      getAILmInfo({
        platform: platform || '',
        model: model ? encodeURIComponent(model.trim()) : '',
      }),
    {
      manual: true,
    },
  );

  // 发送
  const sendMsgRequest = async (data: any, options: any) => {
    const { messages } = data || {};
    const input = messages[messages.length - 1]?.content || '';

    return await AILmEmbed(
      {
        platform: platform || '',
        model: encodeURIComponent(model || ''),
        is_stream: false,
      },
      {
        model: model || '',
        input: [input],
      },
      {
        ...(options || {}),
      },
    );
  };

  const isLoading = loading;
  useEffect(() => {
    if (model) {
      run();
    }
  }, [model]);
  // 检查参数是否有效
  if (!platform || !model) {
    return <Page404 title={'非法访问'} />;
  }

  return (
    <ChatPanel
      className={styles?.chatContainer}
      disabled={isLoading}
      // supportImages={supportImages}
      customRequest={sendMsgRequest}
      onSend={() => {}}
      onStop={() => {}}
    >
      <div>
        <Space size={0} wrap className={styles.chatTags}>
          <span>{platform}</span>
        </Space>
        <Divider type="vertical" />
        <Space size={0} wrap className={styles.chatTitle}>
          <span>{data?.name}</span>
        </Space>
        <Divider type="vertical" />
        <Space size={0} wrap className={styles.chatTags}>
          <Access accessible={access.canSeeAdmin}>
            <Tag color="default">接口类型：{data?.platformCode}</Tag>
            {data?.platformHost && (
              <Tag color="default">API：{data?.platformHost}/api/chat</Tag>
            )}
          </Access>
        </Space>
      </div>
    </ChatPanel>
  );
};

export default AILmEmbedPage;
