import { listReducer } from "./list.reducer"
import {
    insertItem,
    removeItem,
    removeItemByKey,
    updateItem,
    updateItemByKey,
    updateItemsByKey
} from "./list.util"
import {
    INSERT_ITEM,
    REMOVE_ITEM,
    REMOVE_ITEM_BY_KEY,
    RESET_LIST,
    SET_LIST,
    UPDATE_ITEM,
    UPDATE_ITEM_BY_KEY,
    UPDATE_ITEMS_BY_KEY
} from "./list.types"

jest.mock("./list.util")

describe("list.reducer", () => {
    const index = 0
    const reducerName = "reducerName"
    const item = { id: 1000 }

    let state
    let action

    beforeEach(() => {
        state = [
            { id: 0 },
            { id: 1 },
            { id: 2 },
            { id: 3 },
            { id: 4 }
        ]
        action = {
            payload: {
                item,
                index
            },
            meta: { reducerName }
        }
    })

    describe("safety nets", () => {
        [
            { desc: "no options", expected: [] },
            { desc: "options with only reducer name", options: { reducerName }, expected: [] },
            { desc: "options with reducer name and initialState", options: { reducerName, initialState: null }, expected: null }
        ].forEach(({ desc, expected, options }) => {
            it(`should return initialState: ${desc}`, () => {
                expect(
                    listReducer(options)()
                ).toEqual(
                    expected
                )
            })
        })
    })

    describe("INSERT_ITEM", () => {
        it("should call insertItem", () => {
            action = {
                ...action,
                type: INSERT_ITEM
            }
            listReducer({ reducerName })(state, action)

            expect(
                insertItem
            ).toHaveBeenCalledTimes(
                1
            )
        })
    })

    describe("REMOVE_ITEM", () => {
        it("should call removeItem", () => {
            action = {
                ...action,
                type: REMOVE_ITEM
            }
            listReducer({ reducerName })(state, action)

            expect(
                removeItem
            ).toHaveBeenCalledTimes(
                1
            )
        })
    })

    describe("REMOVE_ITEM_BY_KEY", () => {
        it("should call removeItemByKey", () => {
            action = {
                ...action,
                type: REMOVE_ITEM_BY_KEY
            }
            listReducer({ reducerName })(state, action)

            expect(
                removeItemByKey
            ).toHaveBeenCalledTimes(
                1
            )
        })
    })

    describe("UPDATE_ITEM", () => {
        it("should call updateItem", () => {
            action = {
                ...action,
                type: UPDATE_ITEM
            }
            listReducer({ reducerName })(state, action)

            expect(
                updateItem
            ).toHaveBeenCalledTimes(
                1
            )
        })
    })

    describe("UPDATE_ITEM_BY_KEY", () => {
        it("should call updateItemByKey", () => {
            action = {
                ...action,
                type: UPDATE_ITEM_BY_KEY
            }
            listReducer({ reducerName })(state, action)

            expect(
                updateItemByKey
            ).toHaveBeenCalledTimes(
                1
            )
        })
    })

    describe("UPDATE_ITEMS_BY_KEY", () => {
        it("should call updateItemsByKey", () => {
            action = {
                ...action,
                type: UPDATE_ITEMS_BY_KEY
            }
            listReducer({ reducerName })(state, action)

            expect(
                updateItemsByKey
            ).toHaveBeenCalledTimes(
                1
            )
        })
    })

    describe("RESET_LIST", () => {
        it("should reset list to initial state", () => {
            action = {
                ...action,
                type: RESET_LIST
            }
            listReducer({ reducerName })(state, action)

            expect(
                listReducer({ reducerName })(state, action)
            ).toEqual(
                []
            )
        })
    })

    describe("SET_LIST", () => {
        it("should return a brand new state", () => {
            action = {
                ...action,
                type: SET_LIST,
                payload: [ { id: 0 } ]
            }

            expect(
                listReducer({ reducerName })(state, action)
            ).toEqual(
                [ { id: 0 } ]
            )
        })
    })

    describe("default", () => {
        it("should return state", () => {
            action = {
                ...action,
                type: "UNKNOWN"
            }

            expect(
                listReducer({ reducerName })([], action)
            ).toEqual(
                []
            )
        })
    })

    describe("error", () => {
        it("should return state", () => {
            action = {
                ...action,
                error: true
            }

            expect(
                listReducer({ reducerName })([], action)
            ).toEqual(
                []
            )
        })
    })
})
