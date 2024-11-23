import React from 'react';

const AddRecipeForm = () => {
  return (
    <div className="recipe-container">
      <h1>Add a recipe</h1>
      <p className="subtitle">Share your creation with the community</p>

      <div className="form-wrapper">
        <div className="left-column">
          <div className="input-group">
            <label>Add a Recipe Name</label>
            <input type="text" placeholder="Enter a Name" />
          </div>

          <div className="input-group">
            <label>Add a Short Description</label>
            <textarea
              placeholder="Enter Short Description"
              className="long-description"
            />
          </div>

          <div className="bottom-sections">
            <div className="appliances-section">
              <label style={{ fontWeight: 600 }}>
                Specify Appliances Needed
              </label>
              <div className="appliances-grid">
                <div className="appliance-row">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    Rice Cooker
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    Panini Press
                  </label>
                </div>

                <div className="appliance-row">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    Toaster Oven
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    Toaster
                  </label>
                </div>

                <div className="appliance-row">
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    Microwave
                  </label>
                  <label className="checkbox-label">
                    <input type="checkbox" />
                    Hot Plate & Pan
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="right-column">
          <div className="input-group">
            <label>Recipe Hero Image</label>
            <div className="image-upload">
              <input type="file" accept="image/*" className="file-input" />
              <div className="upload-placeholder">
                <p>Click or drag to upload image</p>
              </div>
            </div>
            <div className="ingredients-section">
              <label>Specify Ingredients Needed</label>
              <textarea placeholder="Enter Ingredients as list" />
            </div>
          </div>
        </div>
      </div>

      <div className="input-group">
        <label>Add the Steps/Long Description</label>
        <textarea
          placeholder="Enter Long Description"
          className="long-description"
        />
      </div>

      <button className="submit-button">Submit Recipe</button>
    </div>
  );
};

export default AddRecipeForm;
