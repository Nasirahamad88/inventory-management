import mongoose, {Schema} from "mongoose";

const productSchema = new Schema(
    {
        name: String,
        price: String,
        brand:String,
    },
    {
        timestamps:true,
    }
)

const Product =
    mongoose.model.Product || mongoose.model("Product", productSchema);

export default Product;