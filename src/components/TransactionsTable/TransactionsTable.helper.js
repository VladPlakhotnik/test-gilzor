import {
  CheckOutlined,
  CloseOutlined,
  EllipsisOutlined,
} from '@ant-design/icons'
import {
  Button as ButtonAntd,
  DatePicker,
  Dropdown,
  Input,
  InputNumber,
  Select,
} from 'antd'
import dayjs from 'dayjs'

import { DropButton } from './TransactionsTable.styles'

const { Option } = Select

export const getColumns = (
  handleEdit,
  handleDelete,
  handleEditFieldChange,
  handleEditSave,
  handleEditExit,
  editingIndex,
  editingDate,
) => {
  const columns = [
    {
      title: 'Data',
      dataIndex: 'date',
      key: 'date',
      render: (text, _, index) =>
        editingIndex === index ? (
          <DatePicker
            defaultValue={editingDate}
            onChange={value => handleEditFieldChange(index, 'date', value)}
          />
        ) : text ? (
          text
        ) : (
          'No date'
        ),
      sorter: (a, b) =>
        dayjs(a.date, 'DD/MM/YYYY').valueOf() -
        dayjs(b.date, 'DD/MM/YYYY').valueOf(),
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (text, record, index) =>
        editingIndex === index ? (
          <InputNumber
            value={text}
            onChange={value => handleEditFieldChange(index, 'amount', value)}
          />
        ) : (
          `${record.type === 'expense' ? '-' : ''}${text}$`
        ),
      sorter: (a, b) => {
        const amountA = a.amount * (a.type === 'expense' ? -1 : 1)
        const amountB = b.amount * (b.type === 'expense' ? -1 : 1)
        return amountA - amountB
      },
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: (text, _, index) =>
        editingIndex === index ? (
          <Select
            value={text}
            onChange={value => handleEditFieldChange(index, 'type', value)}
          >
            <Option value='income'>Income</Option>
            <Option value='expense'>Expense</Option>
          </Select>
        ) : (
          text
        ),
    },
    {
      title: 'Note',
      dataIndex: 'note',
      key: 'note',
      render: (text, _, index) =>
        editingIndex === index ? (
          <Input
            value={text}
            onChange={e => handleEditFieldChange(index, 'note', e.target.value)}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      width: '10%',
      render: (text, record, index) =>
        editingIndex === index ? (
          <>
            <ButtonAntd
              icon={<CheckOutlined />}
              onClick={() => handleEditSave(index, true)}
              size='small'
            />
            <ButtonAntd
              icon={<CloseOutlined />}
              onClick={() => handleEditExit()}
              size='small'
            />
          </>
        ) : (
          <Dropdown
            menu={{
              items: [
                {
                  key: 'Edit',
                  label: (
                    <DropButton type='link' onClick={() => handleEdit(index)}>
                      Edit
                    </DropButton>
                  ),
                },
                {
                  key: 'Delete',
                  label: (
                    <DropButton type='link' onClick={() => handleDelete(index)}>
                      Delete
                    </DropButton>
                  ),
                },
              ],
            }}
          >
            <EllipsisOutlined />
          </Dropdown>
        ),
    },
  ]

  return columns
}

export const calculateTotalIncomeAndExpense = transactions => {
  return transactions.reduce(
    (acc, transaction) =>
      transaction.type === 'income'
        ? acc + transaction.amount
        : acc - transaction.amount,
    0,
  )
}
