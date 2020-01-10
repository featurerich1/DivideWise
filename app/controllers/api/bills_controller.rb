class Api::BillsController < ApplicationController
    before_action :require_login

    def create
        @bill = Bill.new(bill_params)
        @bill.settled = true

        if @bill.save
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status:422
        end
    end

    def index  
        @bills = Bill.all.where("settled = 'true'").where("lender_id = #{current_user.id} OR borrower_id = #{current_user.id}" )
        render "api/bills/index"
        #[{"id":1,"description":"good mongkok",
        # "lender_id":1,"borrower_id":2,"amount":1000,
        # "settled":true,"created_at":"2020-01-10T21:39:15.985Z",
        # "updated_at":"2020-01-10T21:39:15.985Z"},
        # {"id":2,"description":"beer","lender_id":1,"borrower_id":2,
        # "amount":800,"settled":true,"created_at":"2020-01-10T21:39:15.990Z",
        # "updated_at":"2020-01-10T21:39:15.990Z"}]
    end

    def show
        @bill = Bill.new(bill_params)
        @bill.settled = true

        if @bill.save
            render "api/bills/show"
        else
            render json: @bill.errors.full_messages, status:422
        end
    end

    def update
        @bill = Bill.find(params[:id])
        if @bill.update(bill_params)
            render "api/bills/show"
        else
        end
    end

    def destroy
        @bill = Bill.find(params[:id])
        @bill.destroy!
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