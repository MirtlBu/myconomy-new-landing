module.exports = function(grunt) {

  grunt.initConfig({
    watch: {
      // Следим за файлами, выполняем таски при каждом изменении
      options: {
        // При вызове в терминале `grunt watch`
        // сначала выполнятся все таски и потом начнётся слежение
        atBegin: true
      },
      js: {
        // Все файлы в папке www/js (включая подпапки)
        files: 'scripts/*.js',
        tasks: ['concat:js']
      },
      css: {
        // Тоже самое с www/css
        files: 'styles/*.css',
        tasks: ['concat:css', 'autoprefixer']
      },
      sass: {
        files: 'styles/*scss',
        tasks: ['sass', 'autoprefixer']
      }
    },
    sass: {
      dist: {
        files: {
          'styles/style.css': 'styles/style.scss'
        }
      }
    },
    bower_concat: {
      pluginsjs: {
        dest: 'scripts/plugins.js',
        include: [
          'jquery',
          'social-likes'
        ],
        bowerOptions: {
          relative: false
        }
      }
    },
    concat: {
      // Склеить
      js: {
        files: {
          // Все файлы разом, подключаются в алфавитном порядке
          'www/js/all.js': 'scripts/**/*.js'
        }
      },
      css: {
        files: {
          // Можно указывать конкретный порядок
          'www/css/style.css': [
            'styles/style.css',            
            'bower_components/social-likes/social-likes_birman.css',
            'bower_components/fontawesome/css/font-awesome.css'
          ]
        }
      }
    },
    autoprefixer: {
      // Расставить необходимые префиксы в ЦСС
      main: {
        files: {
          'www/css/style.css': 'www/css/style.css'
        }
      }
    },
    uglify: {
      // Сжать скрипты
      main: {
        files: {
          'www/js/all.js': 'www/js/all.js'
        }
      }
    },
    csso: {
      // Cжать стили
      // Ссылаемся на autoprefixer, чтобы не повторяться
      main: '<%= autoprefixer.main %>'
    }
  });

  // Загружаем установленные задачи
  // (офтопик: будь я разработчиком Гранта, выкинул бы этот блок)
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-csso');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-bower-concat');

  // Задача по умолчанию (`grunt` в терминале)
  grunt.registerTask('default', ['concat', 'sass', 'bower_concat','autoprefixer', 'uglify', 'csso']);

};
