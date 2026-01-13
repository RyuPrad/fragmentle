import { useState } from 'react'
import { PREFIXES, SUFFIXES, ROOTS } from '../../lib/constants'

export default function MorphemePalette({ onSelect, usedMorphemes }) {
  const [rootSearch, setRootSearch] = useState('')
  const [activeTab, setActiveTab] = useState('all') // 'all', 'prefix', 'root', 'suffix'

  const filteredRoots = ROOTS.filter(root =>
    root.value.toLowerCase().includes(rootSearch.toLowerCase())
  )

  // Check if morpheme was used in previous guesses (for graying out)
  const isUsedInGuess = (morpheme) => {
    return usedMorphemes.some(m => 
      m.value === morpheme.value && m.type === morpheme.type
    )
  }

  const MorphemeButton = ({ morpheme, colorClass }) => {
    const isUsed = isUsedInGuess(morpheme)
    const displayValue = morpheme.type === 'prefix' 
      ? `${morpheme.value}-` 
      : morpheme.type === 'suffix' 
        ? `-${morpheme.value}`
        : morpheme.value

    return (
      <button
        onClick={() => onSelect(morpheme)}
        disabled={isUsed}
        title={morpheme.meaning}
        className={`
          px-3 py-1.5 rounded-lg text-sm font-medium 
          transition-all duration-150
          ${isUsed 
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
            : `${colorClass} hover:scale-105 active:scale-95`
          }
        `}
      >
        {displayValue}
      </button>
    )
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
      
      {/* Tab Navigation */}
      <div className="flex gap-1 p-1 bg-gray-100 rounded-lg">
        {[
          { key: 'all', label: 'All' },
          { key: 'prefix', label: 'Prefixes' },
          { key: 'root', label: 'Roots' },
          { key: 'suffix', label: 'Suffixes' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`
              flex-1 py-1.5 text-sm font-medium rounded-md transition
              ${activeTab === tab.key 
                ? 'bg-white text-gray-800 shadow-sm' 
                : 'text-gray-500 hover:text-gray-700'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Prefixes */}
      {(activeTab === 'all' || activeTab === 'prefix') && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Prefixes
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {PREFIXES.map(prefix => (
              <MorphemeButton 
                key={prefix.value}
                morpheme={prefix}
                colorClass="bg-blue-50 text-blue-700 hover:bg-blue-100"
              />
            ))}
          </div>
        </div>
      )}

      {/* Roots */}
      {(activeTab === 'all' || activeTab === 'root') && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-green-500"></span>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Roots
            </h3>
          </div>
          
          {/* Search */}
          <div className="relative mb-2">
            <input
              type="text"
              placeholder="Search roots..."
              value={rootSearch}
              onChange={(e) => setRootSearch(e.target.value)}
              className="w-full px-3 py-2 pl-9 text-sm border border-gray-200 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
            />
            <svg 
              className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {rootSearch && (
              <button
                onClick={() => setRootSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Root buttons */}
          <div className="flex flex-wrap gap-2 max-h-40 overflow-y-auto p-1">
            {filteredRoots.length > 0 ? (
              filteredRoots.map(root => (
                <MorphemeButton 
                  key={root.value}
                  morpheme={root}
                  colorClass="bg-green-50 text-green-700 hover:bg-green-100"
                />
              ))
            ) : (
              <p className="text-sm text-gray-400 italic">No roots found</p>
            )}
          </div>
        </div>
      )}

      {/* Suffixes */}
      {(activeTab === 'all' || activeTab === 'suffix') && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="w-2 h-2 rounded-full bg-purple-500"></span>
            <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
              Suffixes
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {SUFFIXES.map(suffix => (
              <MorphemeButton 
                key={suffix.value}
                morpheme={suffix}
                colorClass="bg-purple-50 text-purple-700 hover:bg-purple-100"
              />
            ))}
          </div>
        </div>
      )}

      {/* Legend */}
      <div className="pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400 text-center">
          Hover over a morpheme to see its meaning
        </p>
      </div>
    </div>
  )
}