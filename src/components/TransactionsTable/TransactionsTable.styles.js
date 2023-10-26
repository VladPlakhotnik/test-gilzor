import { Button as ButtonAntd } from 'antd'
import styled from 'styled-components'

export const Button = styled(ButtonAntd)`
  background-color: #000;
  color: #fff;
  margin-bottom: 2em;
`
export const DropButton = styled(ButtonAntd)`
  padding: 0;
  width: 100%;
  color: #000;
`

export const Container = styled.div`
  width: 70%;

  .ant-table-footer {
    font-weight: bold;
    padding: 0 1em;
  }
`
