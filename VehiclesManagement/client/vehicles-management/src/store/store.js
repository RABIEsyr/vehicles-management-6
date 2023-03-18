import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import config from '../config/config';

const url = config.apiUrl;

Vue.use(Vuex);

const store = new Vuex.Store(

    {
        state: {
            isAuthenticated: null,
            // sendersList: [],
            image: null,

            // search state
            serialNumberSearch: null,
            dateSearch: null,
            searchResult: {}
        },
        getters: {
            getIsAutenticated: state => state.isAuthenticated,
            getImage: state => state.image,

             // search get
             getSerialNumberSearch: state => state.serialNumberSearch,
             getdateSearch: state => state.dateSearch,
             getSearchResult: state => state.searchResult
        },
        mutations: {
            checkIsAuthenticated(state, payload) {
                state.isAuthenticated = payload;
            },
            loginMutation(state, payload) {
                console.log('payload', payload);
                state.isAuthenticated = payload;
            },
            logoutMutations(s) {
                s.isAuthenticated = false
            },
            // mutSendersList(state, payload) {
            //     state.sendersList = payload
            // },
            setImageM(state, payload) {
                state.image = payload;
            },

            // search mutation
            setSerialNumberSearch(state, payload) {
                state.serialNumberSearch = payload;
            },
            setDateSearch(state, payload) {
                state.dateSearch = payload
            },
            setSearchResult(state, payload) {
                state.searchResult = payload
            }

        },
        actions: {
            async checkIsAuthenticated({ commit }, token) {
                if (!token) return false;
                else {
                    try {
                        const data = await axios.post(url + '/check-is-auth', { token });
                        const isAuth = data.data;
                        // console.log('store:isAuth', isAuth);
                        if (isAuth.success) {
                            commit('checkIsAuthenticated', true);
                            return true;
                        } else {
                            commit('checkIsAuthenticated', false);
                            return false;
                        }
                    } catch (error) {
                        console.log('err1: ', error)
                        commit('checkIsAuthenticated', false);
                        return false;
                    }

                }
            },
            async loginActions({ commit }, { username, password }) {
                const data = await axios.post(url + '/auth/log-in',
                    {
                        username,
                        password
                    }
                );
                const result = data.data;
                if (result.success) {
                    // console.log('store lo:,', result);
                    localStorage.setItem('token', result.token);
                    commit('loginMutation', true);
                    return true;
                } else {
                    commit('loginMutation', false);
                    return false
                }

            },
            async addNewMessage(_, { conclusion, messageNumber, serialNumber, date, senderId, result, images }) {
                await axios.post(url + '/new-message/new',
                    {
                        serialNumber,
                        senderId,
                        messageNumber,
                        conclusion,
                        date,
                        result,
                        images
                    },
                    { headers: { authorization: localStorage.getItem('token') } }
                );
            },
            // async fetchOneMessage({commit}, {year, serialNumber}) {
            //     await axios.post(url + '/edit-message', 
            //     {

            //     },
            //     { headers: { authorization: localStorage.getItem('token') } }
            //     )
            // },
            async addNewSenderX(_, { name }) {
                await axios.post(url + '/add-sender',
                    {
                        name
                    },
                    { headers: { authorization: localStorage.getItem('token') } }
                );
            },
            async getSendersList() {
                const data = await axios.get(url + '/get-senders',
                    {
                        headers: { authorization: localStorage.getItem('token') }
                    }
                );
                console.log('sender5', data.data)
                return data.data;
            },
            // async uploadImageX(_, payload) {
                
                
            //     axios.post(url + '/edit-message', {
            //         payload
            //     },
            //         {
            //             headers: {
            //                 // "Content-Type": "multipart/form-data",
            //                 authorization: localStorage.getItem('token')
            //             }
            //         }
            //     )
            // }
            async searchForIncoming({commit}, {serial, date}) {
                const data = await axios.post(url + '/edit-message/get-no-edit',
                {
                    serial,
                    date
                },
                { headers: { authorization: localStorage.getItem('token') } }
                );
                console.log('result for search', data.data)
                commit('setSearchResult', data.data)
            }

        }
    }
)

export default store;