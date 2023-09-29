import React from 'react';

function FeaturedRecipe ({featuredRecipe}) {




    return (
        <div class="card mb-3" style={{ width: "100%" }}>
            <div class="row g-0">
            <div class="col-md-4">
                <img src={featuredRecipe.image}style={{ width: "500px", height:"500px" }} class="img-fluid rounded-start" alt="featured recipe"/>
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h2 class="card-title mb-3 ms-3">{featuredRecipe.name}</h2>
                <p class="card-text fs-7 ms-3">{featuredRecipe.description}</p>
                <h3 class="ms-3">Instructions</h3>
                <p class="card-text ms-3">{featuredRecipe.instructions}</p>
                <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>

                <div class="dropdown">
                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown">
                        Dropdown button
                    </button>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="/featured">Link 1</a></li>
                        <li><a class="dropdown-item" href="#">Link 2</a></li>
                        <li><a class="dropdown-item" href="#">Link 3</a></li>
                    </ul>
                </div>






                </div>
            </div>
            </div>
        </div>
    )
}

export default FeaturedRecipe;