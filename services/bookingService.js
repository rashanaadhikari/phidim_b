import { where } from "sequelize"
import { Booking, User } from "../models/index.js"


export const createBookingService = async (data, userId, workerId) => {

    const workerExists = await User.findOne({ where: { id: workerId, isKycVerified: true } })


    if (!workerExists) { throw new Error("Worker doesn't exists") }

    const booking = await Booking.create({
        customerId: parseInt(userId),
        workerId: parseInt(workerId),
        status: 'pending',
        proposedPrice: data.proposedPrice,
        location: data.location,
        description: data.description,
        contact: data.contact,
        image: data.image
    })

    if (!booking) {
        throw new Error("Booking service  failed")
    }

    return booking

}


export const getAllBookingByUserService = async (userId) => {

    const result = await Booking.findAll(
        {
            where: {
                customerId: userId,
                forCustomer: true
            },
            attributes: {
                exclude: ['forWorker']
            },
        
            include : [
                {
                    model : User,
                    as : 'worker',
                    attributes : ['fullname','phone','address','rate','status']
                },
                {
                    model : User,
                    as : 'customer',
                    attributes : ['fullname','phone','role','address']
                }
            ]
        }
    
    )
     if(!result){throw new Error('Booking Not Found')}
    return result
}

export const getAllBookingByWorkerService = async (workerId) => {

    const result = await Booking.findAll({
        where: {
            workerId: workerId,
            forWorker: true
        },
        include : [
            {
                model : User,
                as : 'customer',
                attributes : ['fullname','address','phone','email']
            },
            {
                include : User,
                as : 'worker',
                attributes : ['fullname','email','rate','phone']
            }
        ]
    })
     if(!result){throw new Error('Booking Not Found')}
    return result
}


export const deleteBookingByUserService = async (bookingId, userId) => {

    const result = await Booking.update(
        { forCustomer: false },
        { where: { id: bookingId, customerId: userId } }
    )

    return "success"
}
export const deleteBookingByWorkerService = async (bookingId, workerId) => {

    const result = await Booking.update(
        { forWorker: false },
        { where: { id: bookingId, workerId: workerId } }
    )
    return "success"
}


export const getBookingByUserService = async (userId,bookingId) => {

    const result =await Booking.findOne({
    
            where: {
                customerId: userId,
                forCustomer: true,
                id : bookingId
            },
            attributes: {
                exclude: ['forWorker']
            },
        
        
            include : [
                {
                    model : User,
                    as : 'worker',
                    attributes : ['fullname','phone','address','rate','status']
                },
                {
                    model : User,
                    as : 'customer',
                    attributes : ['fullname','phone','role','address']
                }
            ]  
    }
    )
      if(!result){throw new Error('Booking Not Found')}
    return result
}


export const getBookingByWorkerService = async (workerId,bookingId) => {

    const result = await Booking.findAll({
        where: {
            workerId: workerId,
            forWorker: true,
            id : bookingId
        },
        include : [
            {
                model : User,
                as : 'customer',
                attributes : ['fullname','address','phone','email']
            },
            {
                include : User,
                as : 'worker',
                attributes : ['fullname','email','rate','phone']
            }
        ]
    })
     if(!result){throw new Error('Booking Not Found')}
    return result
}



export const getAllBookingService = async (userId) => {

    const result = await Booking.findAll(
        {
            include : [
                {
                    model : User,
                    as : 'worker',
                    attributes : ['fullname','phone','address','rate','status']
                },
                {
                    model : User,
                    as : 'customer',
                    attributes : ['fullname','phone','role','address']
                }
            ]
        }
    
    )
     if(!result){throw new Error('Booking Not Found')}
    return result
}
