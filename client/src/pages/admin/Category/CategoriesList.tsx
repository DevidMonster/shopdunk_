import RenderCategories from "./component/RenderCategories";
import RenderItems from "./component/RenderItems";

function CategoriesList() {
    return ( 
        <div className="w-[90%] my-10 flex gap-7">
            <RenderCategories/>
            <RenderItems/>
        </div>
    );
}

export default CategoriesList;