# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
User.create!(username: 'demousername', email: 'demo@demo.com', password: 'demopassword')
User.create!(username: 'test', email: 'test', password: 'testtest')
User.create!(username: 'edward', email: 'edward', password: 'edwardedward')

Bill.destroy_all
Bill.create!(description: 'good mongkok', lender_id: 1, borrower_id: 2, amount: 1000, settled: true)
Bill.create!(description: 'beer', lender_id: 1, borrower_id: 2, amount: 800, settled: true)
Bill.create!(description: 'beers', lender_id: 3, borrower_id: 1, amount: 1234, settled: true)

Friendship.destroy_all
Friendship.create!(user_one_id: 1 user_two_id: 3)
Friendship.create!(user_one_id: 1 user_two_id: 2)
Friendship.create!(user_one_id: 2 user_two_id: 3)
Friendship.create!(user_one_id: 3 user_two_id: 2)





