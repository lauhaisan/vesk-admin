import { PRODUCT } from "../constant";

const dummyListVideo = [
  {
    title: "Video 1",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "123",
    url: ""
  },
  {
    title: "Video 2",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "456",
    url: ""
  },
  {
    title: "Video 3",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "789",
    url: ""
  },
  {
    title: "Video 4",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "111",
    url: ""
  },
  {
    title: "Video 5",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "22222",
    url: ""
  },
  {
    title: "Video 6",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "242452",
    url: ""
  },
  {
    title: "Video 7",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "42452452452",
    url: ""
  },
  {
    title: "Video 8",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "78578575",
    url: ""
  },
  {
    title: "Video 9",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "78578566",
    url: ""
  },
  {
    title: "Video 10",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "141747",
    url: ""
  },
  {
    title: "Video 11",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "96939",
    url: ""
  },
  {
    title: "Video 12",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "357375357",
    url: ""
  },
  {
    title: "Video 13",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "0000042",
    url: ""
  },
  {
    title: "Video 14",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "4524524527881",
    url: ""
  },
  {
    title: "Video 15",
    img:
      "https://i.ytimg.com/vi/2KGtXzIb8l8/hq720.jpg?sqp=-oaymwEZCNAFEJQDSFXyq4qpAwsIARUAAIhCGAFwAQ==&rs=AOn4CLB9HklpOFDAoKq0-ubIVoKzdbUMiw",
    _id: "774747485869",
    url: ""
  }
];

const INITIAL_STATE = {
  loading: false,
  listProduct: [],
  messageError: "",
  dummyListVideo
};

const productReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case PRODUCT.GET_ALL_PRODUCT:
      return {
        ...state,
        loading: true,
        messageError: ""
      };
    case PRODUCT.GET_ALL_PRODUCT_SUCCESS:
      return {
        ...state,
        loading: false,
        listProduct: action.data,
        messageError: ""
      };
    case PRODUCT.GET_ALL_PRODUCT_FAIL:
      return {
        ...state,
        loading: false,
        listProduct: [],
        messageError: action.data
      };
    case PRODUCT.CLEAR_DATA:
      return {
        ...state,
        loading: false,
        listProduct: [],
        messageError: ""
      };
    case PRODUCT.SET_STATE_REDUCER:
      return {
        ...state,
        ...action.data
      };

    default:
      return state;
  }
};

export default productReducer;
