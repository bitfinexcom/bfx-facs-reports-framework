'use strict'

const {
  BaseError,
  AuthError
} = require('bfx-report/workers/loc.api/errors')

class CollSyncPermissionError extends BaseError {
  constructor (message = 'ERR_PERMISSION_DENIED_TO_SYNC_SELECTED_COLL') {
    super(message)
  }
}

class UpdateSyncQueueJobError extends BaseError {
  constructor (id) {
    super(`ERR_CAN_NOT_UPDATE_SYNC_QUEUE_JOB_BY_ID_${id}`)
  }
}

class AsyncProgressHandlerIsNotFnError extends BaseError {
  constructor (message = 'ERR_ASYNC_PROGRESS_HANDLER_IS_NOT_FUNCTION') {
    super(message)
  }
}

class AfterAllInsertsHookIsNotHookError extends BaseError {
  constructor (message = 'ERR_AFTER_ALL_INSERTS_HOOK_IS_NOT_HOOK') {
    super(message)
  }
}

class RemoveListElemsError extends BaseError {
  constructor (message = 'ERR_LIST_IS_NOT_ARRAY') {
    super(message)
  }
}

class UpdateRecordError extends BaseError {
  constructor (name) {
    const recordName = name && typeof name === 'string'
      ? `_OF_${name.toUpperCase()}`
      : ''

    super(`ERR_CAN_NOT_UPDATE_RECORD_OF_${recordName}`)
  }
}

class ImplementationError extends BaseError {
  constructor (message = 'ERR_NOT_IMPLEMENTED') {
    super(message)
  }
}

class DAOInitializationError extends BaseError {
  constructor (message = 'ERR_DAO_NOT_INITIALIZED') {
    super(message)
  }
}

class ServerAvailabilityError extends BaseError {
  constructor (restUrl) {
    super(`The server ${restUrl} is not available`)
  }
}

class ObjectMappingError extends BaseError {
  constructor (message = 'ERR_MAPPING_AN_OBJECT_BY_THE_SCHEMA') {
    super(message)
  }
}

class DuringSyncMethodAccessError extends BaseError {
  constructor (message = 'ERR_DURING_SYNC_METHOD_IS_NOT_AVAILABLE') {
    super(message)
  }
}

class CurrencyConversionDataFindingError extends BaseError {
  constructor (message = 'ERR_DATA_IS_NOT_FOUND_TO_CONVERT_CURRENCY') {
    super(message)
  }
}

class SqlCorrectnessError extends BaseError {
  constructor (message = 'ERR_SQL_IS_NOT_CORRECT') {
    super(message)
  }
}

class DbMigrationVerCorrectnessError extends BaseError {
  constructor (message = 'ERR_DB_MIGRATION_VERSION_IS_NOT_CORRECT') {
    super(message)
  }
}

class DbVersionTypeError extends BaseError {
  constructor (message = 'ERR_DB_VERSION_IS_NOT_INTEGER') {
    super(message)
  }
}

class MigrationLaunchingError extends BaseError {
  constructor (message = 'ERR_DB_MIGRATION_HAS_FAILED') {
    super(message)
  }
}

class SubAccountCreatingError extends AuthError {
  constructor (message = 'ERR_SUB_ACCOUNT_CREATION_HAS_FAILED') {
    super(message)
  }
}

class SubAccountUpdatingError extends AuthError {
  constructor (message = 'ERR_SUB_ACCOUNT_UPDATE_HAS_FAILED') {
    super(message)
  }
}

class UserRemovingError extends AuthError {
  constructor (message = 'ERR_USER_REMOVE_HAS_FAILED') {
    super(message)
  }
}

class UserWasPreviouslyStoredInDbError extends AuthError {
  constructor (message = 'ERR_USER_WAS_PREVIOUSLY_STORED_IN_DB') {
    super(message)
  }
}

class SubAccountLedgersBalancesRecalcError extends BaseError {
  constructor (message = 'ERR_SUB_ACCOUNT_LEDGERS_BALANCES_RECALC_HAS_FAILED') {
    super(message)
  }
}

class DatePropNameError extends BaseError {
  constructor (message = 'ERR_DATE_PROP_NAME_IS_EMPTY_OR_NOT_STRING') {
    super(message)
  }
}

class GetPublicDataError extends BaseError {
  constructor (message = 'ERR_GETTING_PUBLIC_DATA_HAS_FAILED') {
    super(message)
  }
}

class DataConsistencyCheckerFindingError extends BaseError {
  constructor (message = 'ERR_DATA_CONSISTENCY_CHECKER_HAS_NOT_BEEN_FOUND') {
    super(message)
  }
}

class DataConsistencyError extends BaseError {
  constructor (message = 'ERR_COLLECTIONS_DATA_IS_NOT_CONSISTENT') {
    super(message)
  }
}

module.exports = {
  BaseError,
  CollSyncPermissionError,
  UpdateSyncQueueJobError,
  AsyncProgressHandlerIsNotFnError,
  AfterAllInsertsHookIsNotHookError,
  RemoveListElemsError,
  UpdateRecordError,
  ImplementationError,
  DAOInitializationError,
  ServerAvailabilityError,
  ObjectMappingError,
  DuringSyncMethodAccessError,
  CurrencyConversionDataFindingError,
  SqlCorrectnessError,
  DbMigrationVerCorrectnessError,
  DbVersionTypeError,
  MigrationLaunchingError,
  SubAccountCreatingError,
  SubAccountUpdatingError,
  UserRemovingError,
  UserWasPreviouslyStoredInDbError,
  SubAccountLedgersBalancesRecalcError,
  DatePropNameError,
  GetPublicDataError,
  DataConsistencyCheckerFindingError,
  DataConsistencyError
}
