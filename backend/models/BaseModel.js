const supabase = require('../config/supabase')

class BaseModel {

  constructor(tableName) {
    this.tableName = tableName
    this.db        = supabase
  }

  // ── READ ──────────────────────────────────────────────────

  async getAll() {
    const { data, error } = await this.db
      .from(this.tableName)
      .select('*')

    if (error) throw new Error(error.message)
    return data
  }

  async getById(id) {
    const { data, error } = await this.db
      .from(this.tableName)
      .select('*')
      .eq('id', id)
      .single()

    if (error) throw new Error(error.message)
    return data
  }

  async getWhere(column, value) {
    const { data, error } = await this.db
      .from(this.tableName)
      .select('*')
      .eq(column, value)

    if (error) throw new Error(error.message)
    return data
  }

  // ── WRITE ─────────────────────────────────────────────────

  async create(record) {
    const { data, error } = await this.db
      .from(this.tableName)
      .insert(record)
      .select()

    if (error) throw new Error(error.message)
    return data[0]
  }

  async createMany(records) {
    const { data, error } = await this.db
      .from(this.tableName)
      .insert(records)
      .select()

    if (error) throw new Error(error.message)
    return data
  }

  async updateById(id, updates) {
    const { data, error } = await this.db
      .from(this.tableName)
      .update(updates)
      .eq('id', id)
      .select()

    if (error) throw new Error(error.message)
    return data[0]
  }

  async upsert(record, conflictColumn = 'id') {
    const { data, error } = await this.db
      .from(this.tableName)
      .upsert(record, { onConflict: conflictColumn })
      .select()

    if (error) throw new Error(error.message)
    return data[0]
  }

  async deleteById(id) {
    const { error } = await this.db
      .from(this.tableName)
      .delete()
      .eq('id', id)

    if (error) throw new Error(error.message)
    return true
  }

  // ── AGGREGATE ─────────────────────────────────────────────

  async countAll() {
    const { count, error } = await this.db
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })

    if (error) throw new Error(error.message)
    return count
  }

  async countWhere(column, value) {
    const { count, error } = await this.db
      .from(this.tableName)
      .select('*', { count: 'exact', head: true })
      .eq(column, value)

    if (error) throw new Error(error.message)
    return count
  }

}

module.exports = BaseModel