/* eslint-disable @typescript-eslint/no-explicit-any */
import useConfirmModal from 'app/hooks/useConfirmModal';
import { useUser } from '@store/user/user.selector';
import { Table, TableProps } from 'antd';
import { useCallback, useEffect, useMemo } from 'react';
import { SpaceStyled, WrapperStyled } from './styled';
import Notification from '@components/notification';

interface DataType {
  id: string;
  name: string;
  email: number;
  isVerified: string;
  role: string;
}

const ManageUser = () => {
  const { userList, onGetUserByAdmin, onDeleteUserByAdmin } = useUser();
  useEffect(() => {
    onGetUserByAdmin();
  }, []);
  const onPressEditButton = useCallback((record: any) => {
    console.log(record);
  }, []);
  const onDeleteUser = useCallback((id: string) => {
    onDeleteUserByAdmin(id).then(() => {
      Notification.success('Delete user successful');
      onGetUserByAdmin();
    });
  }, []);
  const { showConfirm, ConfirmDialog } = useConfirmModal();
  const columns: TableProps<DataType>['columns'] = useMemo(
    () => [
      // {
      //   title: 'ID',
      //   dataIndex: 'id',
      //   key: 'id',
      // },
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
      },
      {
        title: 'Verify',
        dataIndex: 'isVerified',
        key: 'isVerified',
        render: (verify: boolean) => {
          return <>{verify ? <a className="yes">Yes</a> : <a className="no">No</a>}</>;
        },
        width: 100,
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        render: (role: string) => {
          return <>{role !== 'admin' ? <a>User</a> : <a>Admin</a>}</>;
        },
        width: 100,
      },
      {
        title: 'Action',
        key: 'action',
        align: 'center',
        render: (_: any, record: any) => (
          <SpaceStyled size="middle">
            <a
              className="button"
              onClick={() => onPressEditButton(record.id)}>
              Edit
            </a>
            <a
              className="button"
              onClick={() =>
                showConfirm(
                  'Delete user',
                  `Do you sure you want to delete ${record.name} ?`,
                  () => onDeleteUser(record.id),
                  () => {},
                  'Delete',
                )
              }>
              Delete
            </a>
          </SpaceStyled>
        ),
      },
    ],
    [],
  );
  return (
    <WrapperStyled>
      <ConfirmDialog />
      <div className="header">
        <h2>Người dùng</h2>
      </div>
      <Table
        scroll={{ x: 500, y: 360 }}
        dataSource={userList}
        columns={columns}
      />
      ;
    </WrapperStyled>
  );
};

export default ManageUser;
