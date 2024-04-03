import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { PageContainer } from '@ant-design/pro-components';
import { Button, Card, Input, message, Select } from 'antd';
import React, { useRef, useState } from 'react';
import type { FormValueType } from './components/UpdateForm';
import type { TableListItem } from './data';
import { addRule, removeRule, updateRule } from './service';
/**
 * 添加节点
 *
 * @param fields
 */

const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');

  try {
    await addRule({ ...fields });
    hide();
    message.success('添加成功');
    return true;
  } catch (error) {
    hide();
    message.error('添加失败请重试！');
    return false;
  }
};
/**
 * 更新节点
 *
 * @param fields
 */

const handleUpdate = async (fields: FormValueType, currentRow?: TableListItem) => {
  const hide = message.loading('正在配置');

  try {
    await updateRule({
      ...currentRow,
      ...fields,
    });
    hide();
    message.success('配置成功');
    return true;
  } catch (error) {
    hide();
    message.error('配置失败请重试！');
    return false;
  }
};
/**
 * 删除节点
 *
 * @param selectedRows
 */

const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;

  try {
    await removeRule({
      key: selectedRows.map((row) => row.key),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC = () => {
  /** 新建窗口的弹窗 */
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  /** 分布更新窗口的弹窗 */

  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  /** 国际化配置 */

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '数据文件名',
      dataIndex: 'name',
      // tip: '规则名称是唯一的 key',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setShowDetail(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: '数据描述',
      dataIndex: 'desc',
      valueType: 'textarea',
    },
    {
      title: '数据调用次数',
      dataIndex: 'callNo',
      sorter: true,
      hideInForm: true,
      renderText: (val: string) => `${val}`,
    },
    // {
    //   title: '状态',
    //   dataIndex: 'status',
    //   hideInForm: true,
    //   valueEnum: {
    //     0: {
    //       text: '关闭',
    //       status: 'Default',
    //     },
    //     1: {
    //       text: '运行中',
    //       status: 'Processing',
    //     },
    //     2: {
    //       text: '已上线',
    //       status: 'Success',
    //     },
    //     3: {
    //       text: '异常',
    //       status: 'Error',
    //     },
    //   },
    // },
    {
      title: '上次更新时间',
      sorter: true,
      dataIndex: 'updatedAt',
      valueType: 'dateTime',
      renderFormItem: (item, { defaultRender, ...rest }, form) => {
        const status = form.getFieldValue('status');

        if (`${status}` === '0') {
          return false;
        }

        if (`${status}` === '3') {
          return <Input {...rest} placeholder="请输入异常原因！" />;
        }

        return defaultRender(item);
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          key="config"
          onClick={() => {
            handleUpdateModalVisible(true);
            setCurrentRow(record);
          }}
        >
          配置
        </a>,
        <a key="subscribeAlert" href="https://procomponents.ant.design/">
          删除
        </a>,
      ],
    },
  ];

  return (
    <PageContainer>
      <Card bordered={false}>
        <div
          style={{
            height: '600px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <Select
              placeholder="选择数据文件"
              style={{
                maxWidth: 200,
                width: '100%',
              }}
              options={[
                {
                  label: '王昭君',
                  value: 'lisa',
                },
              ]}
            />
            <Select
              placeholder="选择投入指标"
              style={{
                maxWidth: 200,
                width: '100%',
              }}
              options={[
                {
                  label: '王昭君',
                  value: 'lisa',
                },
              ]}
            />
            <Select
              placeholder="选择输出指标"
              style={{
                maxWidth: 200,
                width: '100%',
              }}
              options={[
                {
                  label: '王昭君',
                  value: 'lisa',
                },
              ]}
            />
            <Button type="primary">确定</Button>
          </div>

          <img
            src="img/折线图.png"
            alt=""
            style={{
              width: '1000px',
            }}
          />
        </div>
      </Card>
    </PageContainer>
  );
};

export default TableList;
