declare module "better-sqlite3" {
  interface RunResult {
    changes: number
    lastInsertRowid: number | bigint
  }

  interface Statement<
    BindParameters extends unknown[] = unknown[],
    Result = unknown,
  > {
    get(...params: BindParameters): Result | undefined
    all(...params: BindParameters): Result[]
    run(...params: BindParameters): RunResult
  }

  class Database {
    constructor(
      filename: string,
      options?: {
        readonly?: boolean
        fileMustExist?: boolean
        timeout?: number
        verbose?: (...args: unknown[]) => void
      },
    )

    pragma(statement: string): unknown
    exec(sql: string): this
    prepare<BindParameters extends unknown[] = unknown[], Result = unknown>(
      sql: string,
    ): Statement<BindParameters, Result>
    close(): void
  }

  export = Database
}
