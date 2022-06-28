import billsABI from 'config/abi/bill.json'
import { TokenPrices } from 'state/types'
import { chunk } from 'lodash'
import multicall from 'utils/multicall'
import bills from 'config/constants/bills'
import fetchBillsCalls from './fetchBillsCalls'
import cleanBillsData from './cleanBillsData'

const fetchBills = async (chainId: number, tokenPrices: TokenPrices[]) => {
  const billIds = []
  const billCalls = bills.flatMap((bill) => {
    billIds.push(bill.index)
    return fetchBillsCalls(bill, chainId)
  })
  const vals = await multicall(chainId, billsABI, billCalls)
  const chunkSize = vals.length / bills.length
  const chunkedBills = chunk(vals, chunkSize)
  return cleanBillsData(billIds, chunkedBills, tokenPrices, chainId)
}

export default fetchBills
