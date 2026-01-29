export enum MainActionsConstants {
  FindMyServices = '[MainActions] Find My Services',

  UpdateCustomer = '[MainActions] Update Customer',
  UpdateCustomerSuccess = '[MainActions] Update Customer Success',

  SearchSlots = '[MainActions] Search Slots',
  SearchSlotsSuccess = '[MainActions] Search Slots Success',
  ClearSlotSearch = '[MainActions] Clear Slot Search',

  SelectBarber = '[MainActions] Select Barber',
  SelectService = '[MainActions] Select Service',
  ClearSelectService = '[MainActions] Clear Select Service',
  ClearSelectBarber = '[MainActions] Clear Select Barber',

  ScheduleAppointment = '[MainActions] Schedule Appointment',
  ScheduleAppointmentSuccess = '[MainActions] Select Appointment Success',

  SelectAppointment = '[MainActions] Select Appointment',
  ClearSelectedAppointment = '[MainActions] Clear Selected Appointment',

  FindAppointmentByUuid = '[MainActions] Find Appointment By Uuid',
  FindAppointmentByUuidSuccess = '[MainActions] Find Appointment By Uuid Success',

  FindMyAppointments = '[MainActions] Find My Appointments',
  SearchAppointmentsSuccess = '[MainActions] Search Appointments Success',
  ClearAppointmentSearch = '[MainActions] Clear Appointment Search',

  CancelAppointment = '[MainActions] Cancel Appointment',
  CancelAppointmentSuccess = '[MainActions] Cancel Appointment Success',

  CompleteAppointment = '[MainActions] Complete Appointment',
  CompleteAppointmentSuccess = '[MainActions] Complete Appointment Success'
}

export const MINE_SERVICE_SEARCH_ID = 'mine-services';
