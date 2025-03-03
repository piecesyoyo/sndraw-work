import { useModel } from '@umijs/max';
import { Divider, Select, Space } from 'antd';
import classNames from 'classnames';
import { useEffect } from 'react';
import styles from './index.less';

type PlatformSelectPropsType = {
  title?: string;
  platform?: string;
  changePlatform: (platform: string) => void;
  dataList?: any[];
  allowClear?: boolean;
  // 样式
  className?: string;
};
const PlatformSelect: React.FC<PlatformSelectPropsType> = (props) => {
  const {
    title,
    platform,
    dataList,
    allowClear = false,
    changePlatform,
    className,
  } = props;

  const { platformList } = useModel('lmplatformList');

  useEffect(() => {
    if (platform) {
      return;
    }
    changePlatform(dataList?.[0]?.name);
  }, [dataList]);

  return (
    <Space size={0} className={classNames(styles.selectContainer, className)}>
      <span className={styles.title}>{title || '平台'}</span>
      <Divider type="vertical" />
      {/* <AppstoreOutlined /> */}
      {/* <Divider type="vertical" /> */}
      <Select<string>
        className={styles?.selectElement}
        value={platform}
        placeholder="请选择平台"
        allowClear={allowClear}
        options={(platformList as any)?.map((item: any) => ({
          label: item.name,
          value: item.name,
        }))}
        onChange={(value) => changePlatform(value as any)}
      />
    </Space>
  );
};

export default PlatformSelect;
