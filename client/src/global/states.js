import create from 'zustand'

export const useSideBar = create(function(set) {
    return {
        barStatus: false,
        setBarStatus: function() {
            set(function(state) {
                return {
                    barStatus: !state.barStatus
                }
            })
        } 
    }
})

export const useUpdateModal = create(function(set) {
    return {
        modalStatus: false,
        openModal: function() {
            set(function(state) {
                return {
                    modalStatus: true
                }
            })
        },
        closeModal: function() {
            set(function(state) {
                return {
                    modalStatus: false
                }
            })
        },
        projectName: '',
        setProjectName: function(name) {
            set(function(state) {
                return {
                    projectName: name
                }
            })
        }
    }
})

export const useDB = create(function(set) {
    return {
        projects: null,
        setProjects: async function() {

            let get = await fetch('/api/allprojects')
            let res = await get.json()

            set(function(state) {
                return {
                    projects: res.projects
                }
            })
        }
    }
})