
export class House {
    constructor({ id, imgUrl, description, price }) {
        this.id = id
        this.imgUrl = imgUrl || ''
        this.description = description || ''
        this.price = price || ''
    }
}

