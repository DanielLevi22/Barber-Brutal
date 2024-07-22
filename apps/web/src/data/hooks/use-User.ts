import { useContext } from 'react'
import {useAuthContext} from '../contexts/auth-context'

export const useAuth = () => useContext(useAuthContext)

