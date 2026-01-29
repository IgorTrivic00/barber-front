export enum MainActionsConstants {
  UpdateCustomer = '[MainActions] Update Customer',
  UpdateCustomerSuccess = '[MainActions] Update Customer Success',

  SearchSlots = '[MainActions] Search Slots',
  SearchSlotsSuccess = '[MainActions] Search Slots Success',
  ClearSlotSearch = '[MainActions] Clear Slot Search',

  SelectBarber = '[MainActions] Select Barber',
  SelectService = '[MainActions] Select Service',
  ClearSelectService = '[MainActions] Clear Select Service',
  ClearSelectBarber = '[MainActions] Clear Select Barber',

  SelectAppointment = '[MainActions] Select Appointment',
  ClearSelectedAppointment = '[MainActions] Clear Selected Appointment',

  SearchAppointmentsSuccess = '[MainActions] Search Appointments Success',
  ClearAppointmentSearch = '[MainActions] Clear Appointment Search'
}

export const MINE_SERVICE_SEARCH_ID = 'mine-services';
export const MINE_APPOINTMENT_SEARCH_ID = 'mine-appointments';
