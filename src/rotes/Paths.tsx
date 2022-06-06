import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { useAuth } from '../components/providers/UseAuth'
import { pathRoutes } from './rotes'

const Paths: React.FC = () => {
  const { user } = useAuth()

  return (
    <Routes>

      {pathRoutes.map(path =>
        <Route key={`key ${path.path}`} path={path.path} element={<path.component />} />
      )}
    </Routes>
  )
}

export default Paths
