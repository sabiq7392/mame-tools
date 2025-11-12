'use client'

import { useState } from 'react'
import { Card, Typography, Input, Button, Space, Alert, Tabs } from 'antd'
import { SwapOutlined, ClearOutlined, CopyOutlined } from '@ant-design/icons'

const { Title, Text } = Typography
const { TextArea } = Input

interface DiffResult {
  added: string[]
  removed: string[]
  modified: string[]
  unchanged: string[]
}

export default function JSONDiff() {
  const [json1, setJson1] = useState('')
  const [json2, setJson2] = useState('')
  const [diffResult, setDiffResult] = useState<DiffResult | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [formattedJson1, setFormattedJson1] = useState('')
  const [formattedJson2, setFormattedJson2] = useState('')

  const formatJSON = (jsonString: string): string => {
    try {
      const parsed = JSON.parse(jsonString)
      return JSON.stringify(parsed, null, 2)
    } catch {
      return jsonString
    }
  }

  const parseJSON = (jsonString: string): any => {
    try {
      return JSON.parse(jsonString)
    } catch (e: any) {
      throw new Error(`Invalid JSON: ${e.message}`)
    }
  }

  const compareJSON = () => {
    setError(null)
    setDiffResult(null)
    setFormattedJson1('')
    setFormattedJson2('')

    if (!json1.trim() || !json2.trim()) {
      setError('Please provide both JSON objects to compare')
      return
    }

    try {
      const obj1 = parseJSON(json1)
      const obj2 = parseJSON(json2)

      setFormattedJson1(formatJSON(json1))
      setFormattedJson2(formatJSON(json2))

      const result = findDifferences(obj1, obj2, '')
      setDiffResult(result)
    } catch (e: any) {
      setError(e.message)
    }
  }

  const findDifferences = (obj1: any, obj2: any, path: string): DiffResult => {
    const added: string[] = []
    const removed: string[] = []
    const modified: string[] = []
    const unchanged: string[] = []

    const allKeys = new Set([...Object.keys(obj1 || {}), ...Object.keys(obj2 || {})])

    for (const key of allKeys) {
      const currentPath = path ? `${path}.${key}` : key
      const val1 = obj1?.[key]
      const val2 = obj2?.[key]

      if (!(key in obj1)) {
        added.push(currentPath)
      } else if (!(key in obj2)) {
        removed.push(currentPath)
      } else if (typeof val1 === 'object' && val1 !== null && typeof val2 === 'object' && val2 !== null && !Array.isArray(val1) && !Array.isArray(val2)) {
        const nested = findDifferences(val1, val2, currentPath)
        added.push(...nested.added)
        removed.push(...nested.removed)
        modified.push(...nested.modified)
        unchanged.push(...nested.unchanged)
      } else if (JSON.stringify(val1) !== JSON.stringify(val2)) {
        modified.push(currentPath)
      } else {
        unchanged.push(currentPath)
      }
    }

    return { added, removed, modified, unchanged }
  }

  const swapJSONs = () => {
    const temp = json1
    setJson1(json2)
    setJson2(temp)
    setDiffResult(null)
    setError(null)
    setFormattedJson1('')
    setFormattedJson2('')
  }

  const clearAll = () => {
    setJson1('')
    setJson2('')
    setDiffResult(null)
    setError(null)
    setFormattedJson1('')
    setFormattedJson2('')
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const formatCurrentJSON = (jsonString: string, setter: (val: string) => void) => {
    try {
      const formatted = formatJSON(jsonString)
      setter(formatted)
    } catch (e: any) {
      setError(`Invalid JSON: ${e.message}`)
    }
  }

  return (
    <div className="max-w-[1400px] mx-auto">
      <div className="mb-8 fade-in">
        <Title level={1} className="!m-0 text-gray-900 dark:text-white text-4xl md:text-3xl font-bold mb-4">
          JSON Diff
        </Title>
        <Text className="text-gray-600 dark:text-white/70 text-lg md:text-base">
          Compare two JSON objects and find the differences
        </Text>
      </div>

      {error && (
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          className="mb-6"
          closable
          onClose={() => setError(null)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* JSON 1 */}
        <Card className="rounded-[20px] p-6 glass">
          <div className="flex justify-between items-center mb-4">
            <Title level={4} className="!m-0 text-gray-900 dark:text-white">
              JSON 1
            </Title>
            <Space>
              <Button
                size="small"
                onClick={() => formatCurrentJSON(json1, setJson1)}
                disabled={!json1.trim()}
              >
                Format
              </Button>
              <Button
                size="small"
                icon={<CopyOutlined />}
                onClick={() => copyToClipboard(json1)}
                disabled={!json1.trim()}
              >
                Copy
              </Button>
            </Space>
          </div>
          <TextArea
            rows={15}
            value={json1}
            onChange={(e) => setJson1(e.target.value)}
            placeholder='{"name": "John", "age": 30}'
            className="bg-white/60 dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 font-mono text-sm"
          />
        </Card>

        {/* JSON 2 */}
        <Card className="rounded-[20px] p-6 glass">
          <div className="flex justify-between items-center mb-4">
            <Title level={4} className="!m-0 text-gray-900 dark:text-white">
              JSON 2
            </Title>
            <Space>
              <Button
                size="small"
                onClick={() => formatCurrentJSON(json2, setJson2)}
                disabled={!json2.trim()}
              >
                Format
              </Button>
              <Button
                size="small"
                icon={<CopyOutlined />}
                onClick={() => copyToClipboard(json2)}
                disabled={!json2.trim()}
              >
                Copy
              </Button>
            </Space>
          </div>
          <TextArea
            rows={15}
            value={json2}
            onChange={(e) => setJson2(e.target.value)}
            placeholder='{"name": "John", "age": 31}'
            className="bg-white/60 dark:bg-white/5 border-gray-300 dark:border-white/20 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 font-mono text-sm"
          />
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <Button
          type="primary"
          size="large"
          onClick={compareJSON}
          className="h-12 px-8 text-base font-medium bg-gradient-blue border-0 shadow-blue hover:-translate-y-0.5 hover:shadow-blue-hover transition-all"
        >
          Compare JSON
        </Button>
        <Button
          size="large"
          icon={<SwapOutlined />}
          onClick={swapJSONs}
          className="h-12 px-6 text-base font-medium"
        >
          Swap
        </Button>
        <Button
          size="large"
          icon={<ClearOutlined />}
          onClick={clearAll}
          className="h-12 px-6 text-base font-medium"
        >
          Clear All
        </Button>
      </div>

      {/* Diff Results */}
      {diffResult && (
        <Card className="rounded-[20px] p-6 glass">
          <Title level={3} className="!m-0 !mb-6 text-gray-900 dark:text-white text-2xl font-semibold">
            Differences
          </Title>

          <Tabs
            defaultActiveKey="summary"
            items={[
              {
                key: 'summary',
                label: 'Summary',
                children: (
                  <div className="space-y-4">
                    <div className="p-4 rounded-xl bg-green-500/10 dark:bg-green-500/10 border border-green-500/30">
                      <Text className="text-green-600 dark:text-green-400 font-semibold">
                        Added ({diffResult.added.length})
                      </Text>
                      {diffResult.added.length > 0 ? (
                        <ul className="mt-2 space-y-1">
                          {diffResult.added.map((path, idx) => (
                            <li key={idx} className="text-gray-700 dark:text-green-300 text-sm font-mono">
                              + {path}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Text className="block mt-2 text-gray-500 dark:text-gray-400 text-sm">
                          No fields added
                        </Text>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-red-500/10 dark:bg-red-500/10 border border-red-500/30">
                      <Text className="text-red-600 dark:text-red-400 font-semibold">
                        Removed ({diffResult.removed.length})
                      </Text>
                      {diffResult.removed.length > 0 ? (
                        <ul className="mt-2 space-y-1">
                          {diffResult.removed.map((path, idx) => (
                            <li key={idx} className="text-gray-700 dark:text-red-300 text-sm font-mono">
                              - {path}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Text className="block mt-2 text-gray-500 dark:text-gray-400 text-sm">
                          No fields removed
                        </Text>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-yellow-500/10 dark:bg-yellow-500/10 border border-yellow-500/30">
                      <Text className="text-yellow-600 dark:text-yellow-400 font-semibold">
                        Modified ({diffResult.modified.length})
                      </Text>
                      {diffResult.modified.length > 0 ? (
                        <ul className="mt-2 space-y-1">
                          {diffResult.modified.map((path, idx) => (
                            <li key={idx} className="text-gray-700 dark:text-yellow-300 text-sm font-mono">
                              ~ {path}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Text className="block mt-2 text-gray-500 dark:text-gray-400 text-sm">
                          No fields modified
                        </Text>
                      )}
                    </div>

                    <div className="p-4 rounded-xl bg-gray-500/10 dark:bg-gray-500/10 border border-gray-500/30">
                      <Text className="text-gray-600 dark:text-gray-400 font-semibold">
                        Unchanged ({diffResult.unchanged.length})
                      </Text>
                      {diffResult.unchanged.length > 0 ? (
                        <ul className="mt-2 space-y-1">
                          {diffResult.unchanged.map((path, idx) => (
                            <li key={idx} className="text-gray-500 dark:text-gray-400 text-sm font-mono">
                              = {path}
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <Text className="block mt-2 text-gray-500 dark:text-gray-400 text-sm">
                          No unchanged fields
                        </Text>
                      )}
                    </div>
                  </div>
                ),
              },
              {
                key: 'formatted1',
                label: 'Formatted JSON 1',
                children: (
                  <div>
                    <div className="flex justify-end mb-2">
                      <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={() => copyToClipboard(formattedJson1)}
                      >
                        Copy
                      </Button>
                    </div>
                    <pre className="p-4 rounded-xl bg-gray-50 dark:bg-dark-bg-secondary overflow-auto text-sm font-mono text-gray-900 dark:text-gray-300">
                      {formattedJson1 || 'No JSON to display'}
                    </pre>
                  </div>
                ),
              },
              {
                key: 'formatted2',
                label: 'Formatted JSON 2',
                children: (
                  <div>
                    <div className="flex justify-end mb-2">
                      <Button
                        size="small"
                        icon={<CopyOutlined />}
                        onClick={() => copyToClipboard(formattedJson2)}
                      >
                        Copy
                      </Button>
                    </div>
                    <pre className="p-4 rounded-xl bg-gray-50 dark:bg-dark-bg-secondary overflow-auto text-sm font-mono text-gray-900 dark:text-gray-300">
                      {formattedJson2 || 'No JSON to display'}
                    </pre>
                  </div>
                ),
              },
            ]}
          />
        </Card>
      )}
    </div>
  )
}

