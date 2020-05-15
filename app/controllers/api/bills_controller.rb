# I've been told controllers should be cleaner/skinnier and all the verifying shoudl take place in model classes
# but model classes have no access to current_user which is set in app controller

# But you can still create scope like that, just pass the parameter to it from the controller:

# scope :instanceprojects, lambda { |user|
#     where("projects.instance_id = ?", user.instance_id)
# } 
# Now you can call it in the controller:

# Model.instanceprojects(current_user)



# also Ive been told not to mess with the session object so how do we figure out who the current_user is
# because my desired function finds friends that are a fucntion of current_user, anmely they are current_user's freinds


# you want the whole record/row to be invalid so add error to :base
# class Person < ApplicationRecord
#   def a_method_used_for_validation_purposes
#     errors[:base] << "This person is invalid because ..."
#   end
# end

#else if you want an atribute to be invalid

# class Person < ApplicationRecord
#   def a_method_used_for_validation_purposes
#     errors.add(:name, "cannot contain the characters !@#%*()_-+=")
#   end
# end
 
# person = Person.create(name: "!@#")
 
# person.errors[:name]
#  # => ["cannot contain the characters !@#%*()_-+="]
 
# person.errors.full_messages
#  # => ["Name cannot contain the characters !@#%*()_-+="]


# In development, the default behavior is for the class to be reloaded on each request,
#  thereby resetting your class variable. In production, however, the class is initialized once and so the class variable will persist across multiple requests and multiple sessions.
# TBfiguredout: but the controller objects are still destroyed after 1 request right???

# You should move to a proper caching technique as soon as you can. 
# You cannot, obviously, persist the value beyond the reloading of the class when the application is restarted. 
# Furthermore, if the web server is multi-threaded (as it is likely to be), 
# it may be running multiple instances of the application on different threads which do not share the class variables, potentially creating inconsistencies between requests.
# Puma is a Rack-based web server with both Sinatra and Rails integration. It was designed specifically for concurrent applications, and supports full multi-threading when run on a fully-threaded Ruby interpreter.
class Api::BillsController < ApplicationController
    before_action :require_login # THIS RUNS inherited current_user setting a @current_user


    def friendshipExist? 
        # IF NOT EXISTS ( SELECT 1 FROM MyTable WHERE ... )
        execute_statement("SELECT * FROM USERS")

    end

    def create
        @bill = Bill.new(bill_params)
        if !Friendship.where("user_one_id = ? OR user_two_id = ?", @bill.lender_id.to_s, @bill.lender_id.to_s)
            .where("user_one_id = ? OR user_two_id = ?", @bill.borrower_id.to_s, @bill.borrower_id.to_s)
            render json: ["become friends first before creating a bill with others"]
        elsif current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            render json: ["not a bill you're involved in"]
        elsif @bill.save
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status:422
        end
    end

    def index  
        #  render json: execute_statement(`SELECT  "users".* FROM "users" INNER JOIN "bills" ON "users"."id" = "bills"."lender_id" WHERE "bills"."borrower_id" = $1 LIMIT $2`)
        # p execute_statement(`Select * From users Where users.id=1`)
        #  render json: execute_statement(`SELECT * FROM users`)
        
        # order of checking is model validations
        # THEN db validations
        #failure on DB validation should be a full blown error message 
        #ERROR:  duplicate key value violates unique constraint "index_friendships_on_user_one_id_and_user_two_id"
        #... must exist means an association ive written in models requires that foreign key to be there

        # answer = Friendship.create(user_one_id:5,user_two_id:2)
        # render json: [answer.errors, answer.errors.full_messages]

        # OLD + CORRECT: 
        @bills = Bill.all.where("lender_id = #{current_user.id.to_s} OR borrower_id = #{current_user.id.to_s}" )
        # render json: @current_user
        render "api/bills/show"
        # render json: [params, current_user, session]
        # render json: [@current_user]
        # render json: current_user
        
        #testing for:
        #yes params can take in a query string
        #yes you can call model classes obviously
        #yes puts show up in rails server
        #yes session is the object thing with id 

        #http://localhost:3000/api/bills?asdf=32
        #{"asdf":"32","format":"json","controller":"api/bills","action":"index"}
        # puts 'SADJFKUYDSFDSF'
        # render json: Bill.involved
        # render "api/bills/index"


        #testing

        # render json: params # {"format":"json","controller":"api/bills","action":"index"}

        # url    = 'http://www.foo.com?id=4&empid=6'
        # uri    = URI.parse(url)
        # params = CGI.parse(uri.query)
        # # params is now {"id"=>["4"], "empid"=>["6"]}

        # id     = params['id'].first
        # render json: [url, uri, params,id] #["http://www.foo.com?id=4\u0026empid=6","http://www.foo.com?id=4\u0026empid=6",{"id":["4"],"empid":["6"]},"4"]
        
        # render "api/bills/index"
        #[{"id":1,"description":"good mongkok",
        # "lender_id":1,"borrower_id":2,"amount":1000,
        # "settled":true,"created_at":"2020-01-10T21:39:15.985Z",
        # "updated_at":"2020-01-10T21:39:15.985Z"},
        # {"id":2,"description":"beer","lender_id":1,"borrower_id":2,
        # "amount":800,"settled":true,"created_at":"2020-01-10T21:39:15.990Z",
        # "updated_at":"2020-01-10T21:39:15.990Z"}]
    end

    def show
        @bill = Bill.find(params[:id])
        if current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            render json: ["not a bill you're involved in"]
        elsif @bill.save
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status:422
        end
    end

    def update
        @bill = Bill.find(params[:id])
        if current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            render json: ["not a bill you're involved in"]
        elsif @bill.update(bill_params)
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status: 422
        end
    end

    def destroy
        @bill = Bill.find(params[:id])
        if current_user.id.to_s != @bill.lender_id.to_s and current_user.id.to_s != @bill.borrower_id.to_s
            render json: ["not a bill you're involved in"]
        elsif @bill.payments != []
            render json: ["cant delete a bill with payments already made to it-- payments must be atomic"]
        else
            @bill.destroy!
            render json: ["Destroyed bill #{@bill.id} about #{@bill.description}"]
        end
    end
    
    private
    def bill_params
        # params.require(:bill).permit(:description, :lender_id, :borrower_id, :amount, :settled)
        params.require(:bill).permit!
    end
end


# $.ajax({
#         method: 'POST',
#         url: '/api/bills',
#         data: {bill: {description: 'wqerqdwder', lender_id: 1, borrower_id: 2,amount: 2, settled: false }}
#     })

# $.ajax({
#         method: 'POST',
#         url: '/api/bills',
#         data: {bill: {user_one_id: 1, user_two_id: 2}}
#     })