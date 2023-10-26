import { Flex, Table, Typography } from 'antd'
import dayjs from 'dayjs'
import React, { useMemo, useState } from 'react'

import {
  addTransaction,
  deleteTransaction,
  getTransactions,
  updateTransaction,
} from '../../utils/localStorage'
import {
  calculateTotalIncomeAndExpense,
  getColumns,
} from './TransactionsTable.helper.js'
import { Button, Container } from './TransactionsTable.styles'

const { Title } = Typography

export const TransactionsTable = () => {
  const [data, setData] = useState(getTransactions())
  const [editingIndex, setEditingIndex] = useState(null)
  const [editingDate, setEditingDate] = useState(dayjs())

  const handleEdit = index => {
    let dateValue = dayjs(data[index].date, 'DD/MM/YYYY')
    if (!dateValue.isValid()) {
      dateValue = dayjs()
    }
    setEditingDate(dateValue)
    setEditingIndex(index)
  }

  const handleDelete = index => {
    deleteTransaction(index)
  }

  const handleEditFieldChange = (index, field, value) => {
    setData(prevData => {
      const newData = [...prevData]
      const editedTransaction = newData[index]
      if (field === 'date') {
        editedTransaction[field] = value ? value.format('DD/MM/YYYY') : null
      } else if (field === 'amount') {
        editedTransaction[field] = Math.abs(value)
      } else {
        editedTransaction[field] = value
      }
      return newData
    })
  }

  const handleEditSave = (index, save = false) => {
    if (save) {
      setData(prevData => {
        const newData = [...prevData]
        const editedTransaction = newData[index]

        updateTransaction(index, editedTransaction)
        setEditingIndex(null)

        return newData
      })
    }
  }

  const handleEditExit = () => {
    setEditingIndex(null)
    setData(getTransactions())
  }

  const columns = useMemo(
    () =>
      getColumns(
        handleEdit,
        handleDelete,
        handleEditFieldChange,
        handleEditSave,
        handleEditExit,
        editingIndex,
        editingDate,
      ),
    [data, editingIndex, editingDate],
  )

  const total = calculateTotalIncomeAndExpense(data)

  const handleAddRow = () => {
    const lastId = data.at(-1)?.id ?? 0

    const newRow = {
      id: lastId + 1,
      date: dayjs().format('DD/MM/YYYY'),
      amount: 0,
      type: 'income',
      note: 'some note',
    }
    setData([...data, newRow])
    addTransaction(newRow)
  }

  return (
    <Container>
      <Title level={2}>Test Task for FrontEnd Developer</Title>
      <Title level={5} underline>
        Сreate a table for accounting expenses and income.
      </Title>
      <Button onClick={handleAddRow}>Add new</Button>
      <Table
        columns={columns}
        dataSource={data}
        rowKey={record => record.id}
        pagination={false}
        footer={() => (
          <Flex justify='space-between'>
            <p>Total:</p>
            <p>{total}$</p>
          </Flex>
        )}
      />
    </Container>
  )
}
