import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateRestaurantDTO } from './dtos/create-restaurant.dto';
import {
  UpdateRestaurantDTO,
  UpdateRestaurantInputType,
} from './dtos/update-restaurant.dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantResolver {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Query(() => [Restaurant])
  restaurants(): Promise<Restaurant[]> {
    return this.restaurantService.getAll();
  }

  @Mutation(() => Boolean)
  async createRestaurant(
    @Args('input') createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<boolean> {
    try {
      await this.restaurantService.createRestaurant(createRestaurantDTO);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  @Mutation(() => Boolean)
  async updateRestaurant(
    @Args('id') id: number,
    @Args('data') updateRestaurantDTO: UpdateRestaurantInputType,
  ): Promise<boolean> {
    try {
      console.log(updateRestaurantDTO, 'why empty');
      await this.restaurantService.updateRestaurant(id, updateRestaurantDTO);
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  }
}
