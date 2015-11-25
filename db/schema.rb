# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151124113105) do

  create_table "products", force: true do |t|
    t.string   "name"
    t.integer  "price"
    t.date     "released_on"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", force: true do |t|
    t.string   "name"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "password_digest"
    t.string   "remember_token"
    t.boolean  "admin",           default: false
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["remember_token"], name: "index_users_on_remember_token"

  create_table "waterparks", force: true do |t|
    t.integer  "user_id"
    t.float    "e_coli"
    t.float    "coliform_bacteria"
    t.float    "cod"
    t.float    "water_temperature"
    t.float    "total_residual_cl"
    t.float    "nh3_n"
    t.string   "weather"
    t.datetime "observed"
    t.string   "place"
    t.float    "latitude"
    t.float    "longitude"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.float    "ph"
    t.float    "electric_conductivity"
    t.string   "color"
  end

  add_index "waterparks", ["user_id", "created_at"], name: "index_waterparks_on_user_id_and_created_at"

end
