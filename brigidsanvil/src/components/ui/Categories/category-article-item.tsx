import { Article } from "@/components/types/article";
import { Button } from "react-bootstrap";

import "./category-article-item.scss";
import { selectArticleById } from "@/components/store/articlesSlice";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import { selectWorld } from "@/components/store/apiSlice";
import { selectWorldCategoriesByWorld } from "@/components/store/categoriesSlice";
import { useState } from "react";
import Select from "react-select";
import { selectStyles } from "@/components/styling/selectstyles";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

export const CategoryArticleItem = (article: Article) => {
  const articleDetail = useSelector(selectArticleById(article.id));
  const world = useSelector(selectWorld);
  const worldCategories = useSelector(selectWorldCategoriesByWorld(world.id));
  const categories = worldCategories!.categories;
  const options = categories.map((category) => ({
    value: category.id,
    label: category.title,
  }));

  const [editMode, setEditMode] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(
    articleDetail?.category?.id || ""
  );

  const handleEdit = () => {
    setEditMode(!editMode);
  };

  const handleCategoryChange = (selectedOption: any) => {
    setSelectedCategory(selectedOption.value);
  };

  const handleSave = () => {};

  const handleCancel = () => {
    setEditMode(false);
  };

  return (
    <li className="category-article">
      <div className="category-article-item">
        <span className="article-title">{article.title}</span>
        <span className="article-type">{article.entityClass}</span>
        <span className="article-state">{article.state}</span>
        {!editMode && (
          <span className="article-edit-toggle">
            <Button
              variant="primary"
              className="article-edit-toggle-button"
              onClick={handleEdit}
              size="sm"
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </Button>
          </span>
        )}
        {editMode && (
          <div className="article-edit-category">
            <Select
              value={options.find(
                (option) => option.value === selectedCategory
              )}
              onChange={handleCategoryChange}
              options={options}
              styles={selectStyles}
            />
            <Button
              variant="success"
              size="sm"
              className="article-edit-category-save"
              onClick={handleSave}
            >
              <FontAwesomeIcon icon={faCheck} />
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="article-edit-category-cancel"
              onClick={handleCancel}
            >
              <FontAwesomeIcon icon={faXmark} />
            </Button>
          </div>
        )}
      </div>

      <ul>
        {articleDetail &&
          articleDetail.childrenArticles &&
          articleDetail.childrenArticles.map((childArticle: Article) => (
            <CategoryArticleItem {...childArticle} />
          ))}
      </ul>
    </li>
  );
};
