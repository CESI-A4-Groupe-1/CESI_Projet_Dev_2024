import CategoryModel from "../models/CategoryModel";


export default {
    getAllCategories() {
        const data = [
            { "id": 1, "name": "Italien" },
            { "id": 2, "name": "Mexicain" },
            { "id": 3, "name": "Asiatique" },
            { "id": 4, "name": "Français" },
            { "id": 5, "name": "Fast Food" }
        ]

        // Transformer les données en instances de Category
        const categories = data.map(categoryData => new CategoryModel(categoryData.id, categoryData.name)); // ici

        return categories;
    }
}