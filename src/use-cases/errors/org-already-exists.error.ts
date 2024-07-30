export class OrgAlreadyExistsError extends Error {
    constructor() {
        super('E-mail already exists in the organization. Please choose a different email.')
    }
}