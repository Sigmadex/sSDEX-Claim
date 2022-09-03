import type { Web3ReactHooks } from '@web3-react/core'
import React from "react";

export function Status({
  isActivating,
  error,
  isActive,
}: {
  isActivating: ReturnType<Web3ReactHooks['useIsActivating']>
  error: ReturnType<Web3ReactHooks['useError']>
  isActive: ReturnType<Web3ReactHooks['useIsActive']>
}) {
  return (
    <div className='scale-50'>
      {error ? (
        <>
          🔴 
        </>
      ) : isActivating ? (
        <>🟡 </>
      ) : isActive ? (
        <>🟢 </>
      ) : (
        <>⚪️ </>
      )}
    </div>
  )
}
