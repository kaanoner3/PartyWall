export interface ItemAttributes {
    id: number;
    name: string;
    price: number;
    quantity: number;
    attributes: ItemAttributeType;
}

export interface ItemAttributeType {
    volume?: number;
    description?: string;
    weight?: number;
}

export interface CreateItemMutationInputs extends ItemAttributes {
    userId: number;
    categoryId: number;
}
