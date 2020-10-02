import { Body, Controller, Get, Post } from '@nestjs/common';

import { AppService } from './app.service';
import { QueryCategoryDto } from './query-category.dto';
import { QuerySharedResourcesDto } from './dtos/query-shared-resources.dto';
import { sleep } from './utils';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('webapi/GetSasToken')
  getSasToken() {
    return this.appService.getFileContent('sastoken.json');
  }

  @Post('webapi/getfavoriteresources')
  getFavoriteResources() {
    return this.appService.getFileContent('favorite.json');
  }

  @Post('webapi/getwhatsnewresources')
  getWhatsNewResources() {
    return this.appService.getFileContent('whatsnew.json');
  }

  @Post('webapi/GetPresentations')
  getPresentation() {
    return this.appService.getFileContent('presentations.json');
  }

  @Post('webapi/getbanners')
  getBanners() {
    return this.appService.getFileContent('banners.json');
  }

  @Post('webapi/GetCategoriesAndResources')
  getCategoriesAndResources(@Body() body: QueryCategoryDto) {
    if (body.categoryid === 16) {
      return this.appService.getFileContent('categoriesandresources-16.json');
    }
    return this.appService.getFileContent('categoriesandresources.json');
  }

  @Post('webapi/GetUserPresentationViewsAsync')
  async getUserPresentationViews(@Body() body: QuerySharedResourcesDto) {
    const pageNumber = body.pageNumber || 0;
    const pageSize = body.pageSize || 10;
    const data = this.appService.getFileContent('userpresentationasync.json');
    const parsed = JSON.parse(data) as any;
    const data0 = parsed.Data[0];
    data0.Result = data0.Result.slice(pageNumber * pageSize, pageNumber * pageSize + pageSize);
    await sleep(2000);
    return parsed;
  }
}
