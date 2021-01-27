import $ from 'jquery'
import Papa from 'papaparse'

import dataUrl from 'url:../data.csv'
;(async () => {
  const response = await fetch(dataUrl)
  const csvString = await response.text()

  var results = Papa.parse(csvString)
  var searchString = ''
  var storageVersion = 'v1'

  /*
  if (localStorage.getItem('storageVersion' === undefined)) {
    console.log('Initalizing local storage')
    localStorage.setItem('storageVersion', storageVersion)
  } else if (
    localStorage.getItem('storageVersion') != storageVersion &&
    (localStorage.getItem('favorites') != undefined || localStorage.getItem('favorites') != [])
  ) {
    localStorage.removeItem('favorites')
    alert(
      'The storage Version has been updated. Beacuse the application is not yet backwards comaptible the stored favorites had to be removed. Sorry for the inconvenience 😔'
    )
    localStorage.setItem('storageVersion', storageVersion)
  }
  */
  localStorage.setItem('storageVersion', storageVersion)
  var favorites = JSON.parse(localStorage.getItem('favorites')) || []

  function addRow(element) {
    let $topicElement = $('<td></td>')

    // Mark search word
    var splitted = element[1].toLowerCase().split(searchString)

    var b = 0
    splitted.forEach((split, i) => {
      for (var m = 0; m < split.length; m++) {
        $topicElement.append(element[1].charAt(b + m))
      }
      b += m

      if (i < splitted.length) {
        // Without the lowercase effect
        var originalNameSearchString = ''
        for (m = 0; m < searchString.length; m++) {
          originalNameSearchString += element[1].charAt(b + m)
        }
        b += m
        $topicElement.append(`<span class="highlighted">${originalNameSearchString}</span>`)
      }
    })

    // Generate Date Element
    let $dateElement = $(`<td><!--<a>-->${element[7] + ', ' + element[6]}<!--</a>--></td>`)

    // Generate Favorite Checkbox
    var fav = false
    favorites.forEach((favorite, index) => {
      if (
        favorite.id == element[0] &&
        favorite.type == element[2] &&
        favorite.supervisor.first == element[10] &&
        favorite.supervisor.second == element[13]
      ) {
        fav = true
      }
    })

    let $favButton = $(`<td><input type="checkbox" ${fav ? 'checked' : ''}></td>`)

    // Set action on $favButton
    $favButton
      .children()
      .first()
      .on('change', () => {
        if ($($favButton.children().first()).is(':checked')) {
          // TODO: Add all criterias
          favorites.push({ id: element[0], type: element[2], supervisor: { first: element[10], second: element[13] } })
        } else {
          favorites.forEach((favorite, index) => {
            // TODO: Add all criterias
            if (
              favorite.id == element[0] &&
              favorite.type == element[2] &&
              favorite.supervisor.first == element[10] &&
              favorite.supervisor.second == element[13]
            ) {
              favorites.splice(index, 1)
            }
          })
        }
        localStorage.removeItem('favorites')
        localStorage.setItem('favorites', JSON.stringify(favorites))

        // Update Table
        handleTable()
      })

    // Create row
    let $row = $('<tr></tr>')

    // Icon for Prüfungsform
    // https://material.io/resources/icons/
    var icon = (() => {
      switch (element[12]) {
        case 'KL':
          return 'edit'
        case 'M':
          return 'record_voice_over'
        case 'BP-HA':
          return 'local_library'
        case 'BP-V':
          return 'star'
        default:
          return 'help'
      }
    })()

    $row.append($favButton) // Fav
    $row.append($topicElement) // Topic Name
    $row.append(`<td>${element[0]}</td>`) // Code
    $row.append(`<td>${element[2]}</td>`) // Studiengang
    $row.append(`<td>${element[4]}</td>`) // PO
    $row.append($dateElement) // Datum
    $row.append(`<td>${element[8]}</td>`) // Beginn
    $row.append(`<td>${element[10]}</td>`) // Dauer
    $row.append(`<td>${element[11]}<br>${element[13]}</td>`) // Prüfer
    $row.append(`<td><i class="material-icons">${icon}</i></td>`) // Prüfungsform Icon

    $('tbody').append($row)
  }

  // Show favorites
  function showFavorites() {
    clearTable()
    results.data.forEach(element => {
      favorites.forEach((favorite, index) => {
        if (
          favorite.id == element[0] &&
          favorite.type == element[2] &&
          favorite.supervisor.first == element[10] &&
          favorite.supervisor.second == element[13]
        ) {
          addRow(element)
        }
      })
    })
  }
  showFavorites()

  function clearTable() {
    $('tbody').html('')
  }

  function search(val) {
    clearTable()
    results.data.forEach(element => {
      if (element[1].toLowerCase().includes(searchString) || element[0].includes(searchString)) {
        addRow(element)
      }
    })
  }

  function handleTable() {
    searchString = $('input').val().toLowerCase()

    // Show favorites when searchString is empty
    if (searchString.length == 0) {
      showFavorites()
    }

    // Limit search for better performance
    if (searchString.length < 2) {
      return
    }

    search(searchString)
  }

  $('input').on('keyup', _ => {
    handleTable()
  })

  $('input').on('keydown', event => {
    if (event.keyCode == 13) {
      event.preventDefault()
      return false
    }
  })
})()
