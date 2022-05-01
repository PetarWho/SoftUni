import { render } from "../../node_modules/lit-html/lit-html.js";

import * as movieService from "../services/movieService.js";
import {singleMovieTemplate} from "../templates/singleMovieTemplate.js";

export const singleMovieView = (ctx) =>{
    movieService.getOne(ctx.params.movieId)
        .then(movie=>{
            render(singleMovieTemplate(movie),document.querySelector('#root'));
        })
}