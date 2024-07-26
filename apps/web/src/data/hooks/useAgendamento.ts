import { useContext } from 'react'
import { ScheduleContext } from '../contexts/schedule-context'

export const useSchedule = () => useContext(ScheduleContext)
