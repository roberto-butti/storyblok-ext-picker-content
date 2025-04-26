import { categories, items } from '@/data'
import { defineConfig, matchCategories, matchSearchTerm } from '@/core'
import { StoryblokIcon } from './components'
import { getPage } from './utils'



const fetchStories = async (
  searchTerm, page, perPage, filterSelection,
  accessToken: string,
  version: string,
  startsWith: string
) => {







  let url = `https://api.storyblok.com/v2/cdn/stories?starts_with=${encodeURIComponent(startsWith)}&version=${version}&token=${accessToken}`;
  if (searchTerm != "") {
    url = url + `&search_term=${encodeURIComponent(searchTerm)}`
  }

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
      console.log('Stories:', data.stories);
      return data.stories;
    } else {
      console.error('Error fetching stories:', data);
    }
  } catch (error) {
    console.error('Network error:', error);
  }
};

export default defineConfig((options) => ({
  title: '3rd Party Content Picker',
  icon: StoryblokIcon,
  validateOptions: () => {
    const { limit } = options

    const isLimitOptionValid = limit === undefined || Number(limit) > 0

    if (!isLimitOptionValid) {
      return {
        isValid: false,
        error: `The 'limit' option must be an integer greater than 0`,
      }
    }

    return {
      isValid: true,
    }
  },
  tabs: [
    {
      name: 'items',
      label: 'Items',
      query: async ({ searchTerm, page, perPage, filterSelection }) => {
        //const filteredItems = items
        //  .filter(matchCategories(filterSelection['categoryMulti'] as string[]))
        //  .filter(matchSearchTerm(searchTerm))
        console.log(options)
        // Your Storyblok public API token
        const accessToken: string = options.accessToken?.trim() ? options.accessToken :"";
        const version = options.version?.trim() ? options.version :"draft";
        const startsWith = options.startsWith?.trim() ? options.startsWith :"default";

        const stories = await fetchStories(
          searchTerm, page, perPage, filterSelection,
          accessToken, version, startsWith
        );

        return {
          items: stories.map( (story) => {
            return {
              id: story.id,
              uuid: story.uuid,
              name: story.content.name,
              image: story.content.image.filename,
              description: story.content.description,
              access_token: accessToken

            }
          }),
          pageInfo: {
            totalCount: stories.length,
          },
        }
      },
      getFilters: async () => [
        {
          type: 'multi',
          label: 'Categories',
          name: 'categoryMulti',
          defaultValue: [],
          options: categories.map((category) => ({
            label: category.name,
            value: category.name,
          })),
        },
      ],
    },
  ],
}))
